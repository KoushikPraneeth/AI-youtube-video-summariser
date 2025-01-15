import { IsString, IsNotEmpty } from 'class-validator';

export class SummarizeVideoDto {
  @IsString()
  @IsNotEmpty()
  readonly videoId!: string;
}