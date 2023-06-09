import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsOptional, IsPhoneNumber, IsString, Length, Max, Min} from "class-validator";

export class LoginAdopterDto {

    @ApiProperty({example: 'user@gmail.com', description: "Email"})
    @IsEmail({}, {message: 'Inccorect email'})
    readonly email: string;

    @ApiProperty({example: '12345', description: "Password"})
    @IsString({message: 'Password should be string'})
    @Length(4, 16, {message: 'Password should be between 4 and 16 characters'})
    readonly password: string;
}