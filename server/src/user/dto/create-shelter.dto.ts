import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString, Length, Max, Min} from "class-validator";

export class CreateShelterDto {

    @ApiProperty({ example: 1, description: 'Shelter ID' })
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @ApiProperty({example: 'Sostradanie NN', description: "Shelter's name"})
    @IsNotEmpty()
    @IsString({ message: 'Name should be string' })
    readonly name: string;

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