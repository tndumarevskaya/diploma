import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateAdopterApplicationDto {
  @ApiProperty({ example: '1', description: 'Adopter ID' })
  @IsNotEmpty()
  @IsNumberString()
  readonly adopter_id: number;

  @ApiProperty({ example: '2', description: 'Shelter ID' })
  @IsNumberString()
  readonly shelter_id?: number;

  @ApiProperty({ example: '123', description: 'Application number' })
  @IsNotEmpty()
  readonly application_number: string;
}