import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { Type } from "../type.model";

export class CreateTypeDto {

    @ApiProperty({example: 'Cat', description: 'Type value'})
    @IsString({ message: 'Type value should be string' })
    readonly value: string;
}