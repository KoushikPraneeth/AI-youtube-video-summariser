import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ChatService } from './chat.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('api/chat')
@UseGuards(ThrottlerGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async chat(@Body() chatMessageDto: ChatMessageDto) {
    console.log('Received chat message:', chatMessageDto);
    return this.chatService.processMessage(
      chatMessageDto.message,
      chatMessageDto.videoId,
      chatMessageDto.context
    );
  }
}