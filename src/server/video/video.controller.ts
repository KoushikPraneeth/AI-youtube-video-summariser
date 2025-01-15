import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VideoService } from './video.service';
import { SummarizeVideoDto } from './dto/summarize-video.dto';

@Controller('api/video')
@UseGuards(ThrottlerGuard)
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post('summarize')
  async summarizeVideo(@Body() summarizeVideoDto: SummarizeVideoDto) {
    console.log('Received summarize request for video:', summarizeVideoDto.videoId);
    return this.videoService.summarizeVideo(summarizeVideoDto.videoId);
  }
}