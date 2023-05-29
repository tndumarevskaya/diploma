import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateAnimalDto {
  @ApiProperty({ example: 'Bobik', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 2, description: 'Age' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  age: number;

  @ApiProperty({ example: 32, description: 'Size in centimeters' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  size: number;

  @ApiProperty({ example: 'Lava игривая, активная, любит различные развлечения и игрушки, любит находиться в центре внимания, дурачиться и веселиться.', description: 'About' })
  @IsNotEmpty()
  @IsString()
  about: string;
}


