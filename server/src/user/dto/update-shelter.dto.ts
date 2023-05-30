import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsInt, Min, Max, IsPhoneNumber, Validate, IsUrl } from "class-validator";
import { ScheduleValidator } from "src/pipes/shedule.validator.pipe";

export class UpdateShelterDto {

    @ApiProperty({ example: 'https://example.com/path/to/image.jpg', description: 'Image URL' })
    @IsOptional()
    @IsUrl({}, { message: 'Invalid image URL' })
    readonly image?: string;

    @ApiProperty({example: 'Sostradanie NN', description: "Shelter's name"})
    @IsOptional()
    @IsString({ message: 'Name should be string' })
    readonly name?: string;

    @ApiProperty({ example: '79103976531', description: 'Phone number' })
    @IsOptional()
    @IsPhoneNumber('RU', { message: 'Invalid phone number' })
    readonly phoneNumber?: string;

    @ApiProperty({example: '123 Main St', description: "Shelter's address"})
    @IsString({ message: 'Address should be a string' })
    @IsOptional()
    readonly address?: string;

    @ApiProperty({ example: '09:00 - 17:00, 10:00 - 18:00', description: 'The schedule of the shelter' })
    @IsOptional()
    @IsString()
    @Validate(ScheduleValidator)
    readonly schedule?: string;

    @ApiProperty({example: 'Additional information', description: 'Additional information'})
    @IsOptional()
    @IsString({ message: 'Additional information should be a string' })
    readonly additionalInfo?: string;
}
