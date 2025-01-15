import { Injectable, HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class ChatService {
  async processMessage(message: string, videoId: string, context: string[]) {
    try {
      console.log('Processing chat message:', { message, videoId, context });
      
      // TODO: Integrate with LLM for chat responses
      // This will be implemented once we have the LLM API key
      
      return {
        response: "This is a placeholder response. LLM integration pending.",
        context: [...context, message]
      };
    } catch (error) {
      console.error('Error processing chat message:', error);
      throw new HttpException(
        'Failed to process message',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}