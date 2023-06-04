import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateChatDto{
  
    @ApiProperty({ example: 1, description: 'User two ID' })
    @IsNumber()
    user_one_id: number;
  
    @ApiProperty({ example: 1, description: 'User two ID' })
    @IsNumber()
    user_two_id: number;
}