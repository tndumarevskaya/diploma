import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min} from "class-validator";

export class CreateAdopterDto {

    @ApiProperty({ example: 1, description: 'Adopter ID' })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({example: 'Dumarevskaya', description: 'Last name'})
    @IsNotEmpty()
    @IsString({ message: 'First name should be string' })
    readonly lastName: string;

    @ApiProperty({example: 'Tatiana', description: 'First name'})
    @IsNotEmpty()
    @IsString({ message: 'Last name should be string' })
    readonly firstName: string;

    @ApiProperty({example: 'user@gmail.com', description: "Email"})
    @IsNotEmpty()
    @IsEmail({}, {message: 'Inccorect email'})
    readonly email: string;

    @ApiProperty({example: '12345', description: "Password"})
    @IsNotEmpty()
    @IsString({message: 'Password should be string'})
    @Length(4, 16, {message: 'Password should be between 4 and 16 characters'})
    readonly password: string;
}