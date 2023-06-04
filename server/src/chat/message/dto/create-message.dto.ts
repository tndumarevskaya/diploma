import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Message } from "../message.model";

export class CreateMessageDto{

    @ApiProperty({ example: "Hello", description: 'Message text' })
    @IsString({ message: 'Text of message should be string' })
    message_text: string;
  
    @ApiProperty({ example: 1, description: 'User From ID' })
    @IsNumber()
    user_from: number;
  
    @ApiProperty({ example: 1, description: 'Chat ID' })
    @IsNumber()
    chat_id: number;
  
    // @ApiProperty({ example: '2023-03-01', description: 'Date Created' })
    // @Column({ type: DataType.DATE, allowNull: false })
    // date_created: Date;
}