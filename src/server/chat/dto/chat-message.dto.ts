import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  videoId: string;

  @IsArray()
  @IsString({ each: true })
  context: string[];
}