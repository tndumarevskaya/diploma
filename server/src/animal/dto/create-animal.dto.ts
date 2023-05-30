import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, Min, IsUrl } from "class-validator";

export class CreateAnimalDto {
  @ApiProperty({ example: 'Bobik', description: 'Name' })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ example: 'https://example.com/path/to/image.jpg', description: 'Image URL' })
  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid image URL' })
  readonly image: string;

  @ApiProperty({ example: 2, description: 'Age' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly age: number;

  @ApiProperty({ example: 32, description: 'Size in centimeters' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  readonly size: number;

  @ApiProperty({ example: 'Lava игривая, активная, любит различные развлечения и игрушки, любит находиться в центре внимания, дурачиться и веселиться.', description: 'About' })
  @IsNotEmpty()
  @IsString()
  readonly about: string;

  @ApiProperty({ example: 1, description: 'Shelter ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly shelter_id: number;

  @ApiProperty({ example: 1, description: 'Type ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly type_id: number;

  @ApiProperty({ example: 1, description: 'Color ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly color_id: number;

  @ApiProperty({ example: 1, description: 'Status ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly status_id: number;

  @ApiProperty({ example: 1, description: 'Gender ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly gender_id: number;

  @ApiProperty({ example: 1, description: 'Communication ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly communication_id: number;

  @ApiProperty({ example: 1, description: 'Fur ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly fur_id: number;

  @ApiProperty({ example: 1, description: 'Behavior ID' })
  @IsNotEmpty()
  @IsNumber()
  readonly behavior_id: number;
}