import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class UpdateAnimalDto {
  @ApiProperty({ example: 'Bobik', description: 'Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 2, description: 'Age' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  age?: number;

  @ApiProperty({ example: 32, description: 'Size in centimeters' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  size?: number;

  @ApiProperty({ example: 'Lava игривая, активная, любит различные развлечения и игрушки, любит находиться в центре внимания, дурачиться и веселиться.', description: 'About' })
  @IsOptional()
  @IsString()
  about?: string;
}