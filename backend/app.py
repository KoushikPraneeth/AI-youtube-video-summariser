# app.py
from flask import Flask, request, jsonify, send_from_directory
from pytube import YouTube
import os
import requests
import json
from datetime import datetime
import tempfile
import shutil
from flask_cors import CORS
from yt_dlp import YoutubeDL

class MyLogger:
    def debug(self, msg):
        print(f"[yt-dlp DEBUG] {msg}")

    def info(self, msg):
        print(f"[yt-dlp INFO] {msg}")

    def warning(self, msg):
        print(f"[yt-dlp WARNING] {msg}")

    def error(self, msg):
        print(f"[yt-dlp ERROR] {msg}")

app = Flask(__name__, static_folder='../dist')
CORS(app)

# Serve frontend files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

DEEPSEEK_API_KEY = "sk-7aaf0a39989b48b6ace358b8cc4eae26"
DEEPSEEK_API_BASE = "https://api.deepseek.com/v1"
WHISPER_API_KEY = "hKXKg5S99RzqV5FdO9jc2UHctEc7iArg"

# In-memory storage for chat history
chat_sessions = {}

def download_audio(youtube_url):
    """Download audio from YouTube video using yt-dlp."""
    try:
        # Create temporary directory
        temp_dir = tempfile.mkdtemp()
        temp_path = os.path.join(temp_dir, "audio.wav")
        
        # Configure yt-dlp options
        ydl_opts = {
            'format': 'bestaudio/best',
            'outtmpl': temp_path.replace('.wav', '.%(ext)s'),
            'postprocessors': [{
                'key': 'FFmpegExtractAudio',
                'preferredcodec': 'wav',
                'preferredquality': '192',
            }],
            'keepvideo': True,
            'ffmpeg_location': '/opt/homebrew/bin/ffmpeg',
            'quiet': False,  # Enable logging for debugging
            'no_warnings': False,
            'verbose': True,
            'logger': MyLogger()
        }
        
        with YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(youtube_url, download=True)
            title = info.get('title', 'audio')
            
        # Verify file was actually created
        if not os.path.exists(temp_path):
            raise Exception(f"Downloaded file not found at {temp_path}")
            
        # Verify file has content
        if os.path.getsize(temp_path) == 0:
            os.remove(temp_path)
            raise Exception("Downloaded file is empty")
            
        return temp_path, title
    except Exception as e:
        raise Exception(f"Error downloading audio: {str(e)}")

def transcribe_audio(audio_path):
    """Transcribe audio using Whisper API."""
    try:
        with open(audio_path, 'rb') as audio_file:
            response = requests.post(
                'https://api.deepinfra.com/v1/inference/openai/whisper-large-v3-turbo',
                headers={'Authorization': f'bearer {WHISPER_API_KEY}'},
                files={'audio': audio_file}
            )
            
            if response.status_code == 200:
                return response.json()
            else:
                raise Exception(f"Transcription failed: {response.text}")
    except Exception as e:
        raise Exception(f"Error in transcription: {str(e)}")

def get_summary(transcript):
    """Generate summary using DeepSeek API."""
    try:
        prompt = f"Please provide a comprehensive summary of the following transcript:\n\n{transcript}"
        
        response = requests.post(
            f"{DEEPSEEK_API_BASE}/chat/completions",
            headers={
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "deepseek-chat",
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.7
            }
        )
        
        if response.status_code == 200:
            return response.json()['choices'][0]['message']['content']
        else:
            raise Exception(f"Summary generation failed: {response.text}")
    except Exception as e:
        raise Exception(f"Error generating summary: {str(e)}")

@app.route('/process-video', methods=['POST'])
def process_video():
    """Process YouTube video and return transcription and summary."""
    try:
        data = request.json
        youtube_url = data.get('url')
        
        if not youtube_url:
            return jsonify({"error": "No URL provided"}), 400
        
        # Download audio
        audio_path, video_title = download_audio(youtube_url)
        
        # Get transcription
        transcription = transcribe_audio(audio_path)
        
        # Get full transcript text
        full_transcript = " ".join([segment['text'] for segment in transcription['segments']])
        
        # Clean up temporary directory and contents
        temp_dir = os.path.dirname(audio_path)
        if os.path.exists(temp_dir):
            shutil.rmtree(temp_dir)
        
        # Generate summary
        summary = get_summary(full_transcript)
        
        # Create new chat session
        session_id = datetime.now().strftime("%Y%m%d%H%M%S")
        chat_sessions[session_id] = {
            "transcript": full_transcript,
            "summary": summary,
            "chat_history": []
        }
        
        return jsonify({
            "session_id": session_id,
            "video_title": video_title,
            "transcript": transcription,
            "summary": summary
        })
    
    except Exception as e:
        import traceback
        print(f"Error processing video: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages."""
    try:
        data = request.json
        session_id = data.get('session_id')
        user_message = data.get('message')
        
        if not session_id or not user_message:
            return jsonify({"error": "Missing session_id or message"}), 400
        
        # Create new session if it doesn't exist
        if session_id not in chat_sessions:
            chat_sessions[session_id] = {
                "transcript": "",
                "summary": "",
                "chat_history": []
            }
        
        # Prepare context for the AI
        session_data = chat_sessions[session_id]
        
        # Build conversation history with proper context
        messages = [
            {
                "role": "system",
                "content": f"""You are a helpful AI assistant analyzing a video. Here is the video context:
                
                Video Summary: {session_data['summary']}
                Full Transcript: {session_data['transcript']}
                """
            }
        ]
        
        # Add previous conversation history
        messages.extend(session_data['chat_history'])
        
        # Add current user message
        messages.append({
            "role": "user",
            "content": user_message
        })
        
        # Get AI response using DeepSeek
        response = requests.post(
            f"{DEEPSEEK_API_BASE}/chat/completions",
            headers={
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "deepseek-chat",
                "messages": messages,
                "temperature": 0.7,
                "max_tokens": 1000
            }
        )
        
        if response.status_code != 200:
            raise Exception("Failed to get AI response")
            
        ai_response = response.json()['choices'][0]['message']['content']
        
        # Update chat history
        session_data['chat_history'].append(
            {"role": "user", "content": user_message}
        )
        session_data['chat_history'].append(
            {"role": "assistant", "content": ai_response}
        )
        
        return jsonify({"response": ai_response})
        
    except Exception as e:
        import traceback
        print(f"Error in chat: {str(e)}")
        traceback.print_exc()
        return jsonify({"error": str(e), "traceback": traceback.format_exc()}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)
