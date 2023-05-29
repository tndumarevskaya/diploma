import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBehaviorDto {

    @ApiProperty({example: 'Active', description: 'Behavior value'})
    @IsString({ message: 'Behavior value should be string' })
    readonly value: string;
}