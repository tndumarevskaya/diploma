import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateColorDto {

    @ApiProperty({example: 'Black', description: 'Color value'})
    @IsString({ message: 'Color value should be string' })
    readonly value: string;
}