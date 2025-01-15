import { Controller, Post, Body } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VideoService } from './video.service';
import { SummarizeVideoDto } from './dto/summarize-video.dto';
import { UseGuards } from '@nestjs/common';

@Controller('api/video')
@UseGuards(ThrottlerGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('summarize')
  summarizeVideo(
    @Body() summarizeVideoDto: SummarizeVideoDto
  ): Promise<{ summary: string; transcript: string }> {
    console.log('Received summarize request for video:', summarizeVideoDto.videoId);
    return this.videoService.summarizeVideo(summarizeVideoDto.videoId);
  }
}