import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCommunicationDto {

    @ApiProperty({example: 'Good with children', description: 'Communication value'})
    @IsString({ message: 'Communication value should be string' })
    readonly value: string;
}