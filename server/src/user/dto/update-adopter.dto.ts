import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt, Min, Max, IsPhoneNumber } from "class-validator";

export class UpdateAdopterDto {
    @ApiProperty({ example: 'John', description: "First name" })
    @IsOptional()
    @IsString({ message: 'First name should be string' })
    readonly firstName?: string;

    @ApiProperty({ example: 'Doe', description: "Last name" })
    @IsOptional()
    @IsString({ message: 'Last name should be string' })
    readonly lastName?: string;

    @ApiProperty({ example: '23', description: 'Age' })
    @IsOptional()
    @IsInt({ message: 'Age should be an integer' })
    @Min(12, { message: 'Age should be at least 12' })
    @Max(100, { message: 'Age should be at most 100' })
    readonly age?: number;

    @ApiProperty({ example: '79103976531', description: 'Phone number' })
    @IsOptional()
    @IsPhoneNumber('RU', { message: 'Invalid phone number' })
    readonly phoneNumber?: string;
   
    @ApiProperty({example: 'Additional information', description: 'Additional information'})
    @IsOptional()
    @IsString({ message: 'Additional information should be a string' })
    readonly additionalInfo?: string;
}
