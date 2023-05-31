import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './message.model';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Create a message' })
  @ApiResponse({ status: 201, description: 'The message has been successfully created.', type: Message })
  @Post()
  createMessage(
    @Body() createMessageDto: CreateMessageDto): Promise<Message> {
    return this.messageService.createMessage(createMessageDto);
  }

  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiResponse({ status: 200, description: 'Returns the message with the specified ID.', type: Message })
  @Get(':id')
  getMessageById(@Param('id') id: number): Promise<Message> {
    return this.messageService.getMessageById(id);
  }

  @ApiOperation({ summary: 'Get all messages' })
  @ApiResponse({ status: 200, description: 'Returns all messages', type: [Message] })
  @Get('')
  getMessages(@Query("chat_id") chatId: number): Promise<Message[]> {
    return this.messageService.getMessages(chatId);
  }
}