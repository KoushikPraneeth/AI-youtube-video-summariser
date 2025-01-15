import { Controller, Post, Body } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';
import { UseGuards } from '@nestjs/common';

@Controller('api/chat')
@UseGuards(ThrottlerGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  chat(@Body() chatMessageDto: ChatMessageDto): Promise<{ response: string; context: string[] }> {
    console.log('Received chat message:', chatMessageDto);
    return this.chatService.processMessage(
      chatMessageDto.message,
      chatMessageDto.videoId,
      chatMessageDto.context
    );
  }
}