import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class CreateVolunteerApplicationDto {
  @ApiProperty({ example: '1', description: 'Volunteer ID' })
  @IsNotEmpty()
  @IsNumberString()
  readonly volunteer_id: number;

  @ApiProperty({ example: '2', description: 'Shelter ID' })
  @IsNumberString()
  readonly shelter_id?: number;

  @ApiProperty({ example: '123', description: 'Application number' })
  @IsNotEmpty()
  readonly application_number: string;
}