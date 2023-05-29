import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateGenderDto {

    @ApiProperty({example: 'Male', description: 'Gender value'})
    @IsString({ message: 'Gender value should be string' })
    readonly value: string;
}