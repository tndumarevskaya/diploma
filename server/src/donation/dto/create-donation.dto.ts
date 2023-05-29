import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({ example: 'Tatiana', description: 'Name of the donor' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ example: '2023-03-01', description: 'Date of the donation' })
  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @ApiProperty({ example: 2300, description: 'Amount of the donation in rubles' })
  @IsNumber()
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ example: 'На лечение Бобика', description: 'Purpose of the donation' })
  @IsString()
  readonly aim: string;
}