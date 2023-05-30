import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Min, IsUrl } from "class-validator";

export class UpdateAnimalDto {
  @ApiProperty({ example: 'Bobik', description: 'Name' })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ example: 'https://example.com/path/to/image.jpg', description: 'Image URL' })
  @IsOptional()
  @IsUrl({}, { message: 'Invalid image URL' })
  readonly image?: string;

  @ApiProperty({ example: 2, description: 'Age' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly age?: number;

  @ApiProperty({ example: 32, description: 'Size in centimeters' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  readonly size?: number;

  @ApiProperty({ example: 'Lava игривая, активная, любит различные развлечения и игрушки, любит находиться в центре внимания, дурачиться и веселиться.', description: 'About' })
  @IsOptional()
  @IsString()
  readonly about?: string;

  @ApiProperty({ example: 1, description: 'Type ID' })
  @IsOptional()
  @IsNumber()
  readonly type_id?: number;

  @ApiProperty({ example: 1, description: 'Color ID' })
  @IsOptional()
  @IsNumber()
  readonly color_id?: number;

  @ApiProperty({ example: 1, description: 'Status ID' })
  @IsOptional()
  @IsNumber()
  readonly status_id?: number;

  @ApiProperty({ example: 1, description: 'Gender ID' })
  @IsOptional()
  @IsNumber()
  readonly gender_id?: number;

  @ApiProperty({ example: 1, description: 'Communication ID' })
  @IsOptional()
  @IsNumber()
  readonly communication_id?: number;

  @ApiProperty({ example: 1, description: 'Fur ID' })
  @IsOptional()
  @IsNumber()
  readonly fur_id?: number;

  @ApiProperty({ example: 1, description: 'Behavior ID' })
  @IsOptional()
  @IsNumber()
  readonly behavior_id?: number;
}