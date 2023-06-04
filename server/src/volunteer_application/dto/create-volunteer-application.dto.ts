import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVolunteerApplicationDto {
  @ApiProperty({ example: '1', description: 'Volunteer ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly volunteer_id: number;

  @ApiProperty({ example: '2', description: 'Shelter ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly shelter_id: number;

  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 25, description: 'Age' })
  @IsNotEmpty()
  @IsNumber()
  readonly age: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Contacts' })
  @IsNotEmpty()
  @IsString()
  readonly contacts: string;

  @ApiProperty({ example: 'Interested in volunteering', description: 'Reason' })
  @IsNotEmpty()
  @IsString()
  readonly reason: string;

  @ApiProperty({ example: "yes", description: 'Visited the shelter' })
  @IsNotEmpty()
  @IsString()
  readonly visited: string;

  @ApiProperty({ example: "1 time", description: 'Number of times per week the volunteer can visit' })
  @IsNotEmpty()
  @IsString()
  readonly frequency: string;

  @ApiProperty({ example: "yes", description: 'Has a dog' })
  @IsNotEmpty()
  @IsString()
  readonly hasDog: string;

  @ApiProperty({ example: 'Previous experience with dogs', description: 'Experience' })
  @IsNotEmpty()
  @IsString()
  readonly experience: string;

}