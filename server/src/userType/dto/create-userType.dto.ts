import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateUserTypeDto {

    @ApiProperty({example: 'Volunteer', description: 'User type'})
    @IsString({ message: 'Value of user type should be string' })
    readonly value: string;
}