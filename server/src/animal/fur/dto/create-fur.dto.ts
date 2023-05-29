import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateFurDto {

    @ApiProperty({example: 'Short', description: 'Fur value'})
    @IsString({ message: 'Fur value should be string' })
    readonly value: string;
}