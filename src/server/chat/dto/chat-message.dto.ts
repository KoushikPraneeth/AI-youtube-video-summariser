import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly message!: string;

  @IsString()
  @IsNotEmpty()
  readonly videoId!: string;

  @IsArray()
  @IsString({ each: true })
  readonly context!: string[];
}