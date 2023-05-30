import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'ID of the adopter' })
  @IsNumber()
  adopter_id: number;

  @ApiProperty({ example: 1, description: 'ID of the animal' })
  @IsNumber()
  animal_id: number;
}