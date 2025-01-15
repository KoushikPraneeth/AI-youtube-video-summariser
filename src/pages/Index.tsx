import { useState } from "react";
import { VideoInput } from "@/components/VideoInput";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Summary } from "@/components/Summary";
import { Chat } from "@/components/Chat";
import { Transcript } from "@/components/Transcript";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [videoId, setVideoId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [summary, setSummary] = useState("");
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const { toast } = useToast();

  const extractVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleUrlSubmit = async (url: string) => {
    const id = extractVideoId(url);
    if (!id) {
      toast({
        title: "Invalid URL",
        description: "Could not extract video ID from URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVideoId(id);
    setSessionId(""); // Reset session ID
    setMessages([]); // Clear previous messages

    try {
      const response = await fetch('http://localhost:5001/process-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process video');
      }

      const data = await response.json();
      if (!data.summary || !data.session_id || !data.transcript) {
        throw new Error('Invalid response format from server');
      }

      setSummary(data.summary);
      setTranscript(data.transcript.text || data.transcript);
      setSessionId(data.session_id);
      setMessages([{
        role: "assistant",
        content: "Hello! I've analyzed the video. Feel free to ask me any questions about it."
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate summary",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (!sessionId) {
      toast({
        title: "Error",
        description: "No active session",
        variant: "destructive",
      });
      return;
    }

    setIsChatLoading(true);
    setMessages(prev => [...prev, { role: "user", content: message }]);

    try {
      const response = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          message: message
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }

      const data = await response.json();
      if (!data.response) {
        throw new Error('Invalid response format from server');
      }

      setMessages(prev => [...prev, {
        role: "assistant",
        content: data.response
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-up">
            AI Video Summarizer
          </h1>
          <p className="text-muted-foreground animate-fade-up">
            Paste a YouTube URL to get an AI-powered summary and chat about the content
          </p>
        </div>

        <VideoInput onSubmit={handleUrlSubmit} isLoading={isLoading} />

        {videoId && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <VideoPlayer videoId={videoId} />
              <div className="space-y-6">
                <Summary summary={summary} isLoading={isLoading} />
                <Transcript content={transcript} />
              </div>
            </div>
            <Chat
              messages={messages}
              onSendMessage={handleSendMessage}
              isLoading={isChatLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
