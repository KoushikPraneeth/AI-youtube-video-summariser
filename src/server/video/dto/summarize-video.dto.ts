import { IsString, IsNotEmpty } from 'class-validator';

export class SummarizeVideoDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;
}