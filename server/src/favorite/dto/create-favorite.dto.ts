import { ApiProperty } from '@nestjs/swagger';

export class CreateFavoriteDto {
  @ApiProperty({ example: 1, description: 'ID of the adopter' })
  adopter_id: number;

  @ApiProperty({ example: 1, description: 'ID of the animal' })
  animal_id: number;
}