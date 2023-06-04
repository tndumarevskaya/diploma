import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';

export class CreateAdopterApplicationDto {
    @ApiProperty({ example: 1, description: 'Adopter ID' })
    @IsNotEmpty()
    @IsNumber()
    readonly adopter_id: number;

    @ApiProperty({ example: 2, description: 'Shelter ID' })
    @IsNumber()
    readonly shelter_id: number;

    @ApiProperty({ example: 'John Doe', description: 'Name of the adopter' })
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty({ example: 30, description: 'Age of the adopter' })
    @IsNotEmpty()
    readonly age: number;

    @ApiProperty({ example: 'New York', description: 'City of the adopter' })
    @IsNotEmpty()
    readonly city: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Contact details of the adopter' })
    @IsNotEmpty()
    readonly contacts: string;

    @ApiProperty({ example: "4", description: 'Number of household members' })
    @IsNotEmpty()
    readonly members: string;

    @ApiProperty({ example: 'Apartment', description: 'Type of home (Apartment, House, etc.)' })
    @IsNotEmpty()
    readonly home: string;

    @ApiProperty({ example: 'Yes', description: 'Whether the adopter has a suitable place for the animal' })
    @IsNotEmpty()
    readonly animal_home: string;

    @ApiProperty({ example: 'No', description: 'Any allergies or health conditions' })
    @IsNotEmpty()
    readonly allergy: string;

    @ApiProperty({ example: 'I love animals and want to provide a loving home', description: 'Reason for adoption' })
    @IsNotEmpty()
    readonly reason: string;
}