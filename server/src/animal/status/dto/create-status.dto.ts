import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateStatusDto {

    @ApiProperty({example: 'Adopted', description: 'Status value'})
    @IsString({ message: 'Status value should be string' })
    readonly value: string;
}