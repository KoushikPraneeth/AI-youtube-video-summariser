import { useState } from "react";
import { VideoInput } from "@/components/VideoInput";
import { VideoPlayer } from "@/components/VideoPlayer";
import { Summary } from "@/components/Summary";
import { Chat } from "@/components/Chat";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const Index = () => {
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
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

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSummary("This is a placeholder summary. Replace with actual API integration.");
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
    setIsChatLoading(true);
    setMessages(prev => [...prev, { role: "user", content: message }]);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "This is a placeholder response. Replace with actual AI integration."
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
              <Summary summary={summary} isLoading={isLoading} />
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