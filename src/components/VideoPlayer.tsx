import { useEffect, useRef } from "react";

interface VideoPlayerProps {
  videoId: string;
}

export const VideoPlayer = ({ videoId }: VideoPlayerProps) => {
  const playerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    console.log("Loading video player for ID:", videoId);
  }, [videoId]);

  if (!videoId) return null;

  return (
    <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg animate-fade-in">
      <iframe
        ref={playerRef}
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="border-0"
      />
    </div>
  );
};