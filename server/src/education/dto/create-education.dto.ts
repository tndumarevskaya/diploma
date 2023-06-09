import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsUrl } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ example: 'How to Train Your Dog', description: 'The title of the education article' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'Tips and techniques for effectively training your dog', description: 'The text content of the education article' })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({ example: 'https://example.com/path/to/image.jpg', description: 'Image URL' })
  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid image URL' })
  readonly image: string;

}