import { IsNotEmpty, IsString } from 'class-validator';

export class MessageBodyDto {
  @IsNotEmpty()
  @IsString()
  text: string;
}
