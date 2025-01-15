import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { getSubtitles } from 'youtube-captions-scraper';

@Injectable()
export class VideoService {
  async summarizeVideo(videoId: string): Promise<{ summary: string; transcript: string }> {
    try {
      console.log('Fetching captions for video:', videoId);
      const captions = await getSubtitles({
        videoID: videoId,
        lang: 'en'
      });

      const transcript = captions
        .map(caption => caption.text)
        .join(' ');

      console.log('Transcript fetched, length:', transcript.length);

      // TODO: Integrate with LLM for summarization
      // This will be implemented once we have the LLM API key
      
      return {
        summary: "This is a placeholder summary. LLM integration pending.",
        transcript
      };
    } catch (error) {
      console.error('Error summarizing video:', error);
      throw new HttpException(
        'Failed to summarize video',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}