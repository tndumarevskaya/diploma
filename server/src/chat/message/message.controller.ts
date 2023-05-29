import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Message } from './message.model';
import { MessageService } from './message.service';

@ApiTags('Message')
@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @ApiOperation({ summary: 'Create a message' })
  @ApiResponse({ status: 201, description: 'The message has been successfully created.', type: Message })
  @Post()
  createMessage(
    @Body('userFrom') userFrom: number,
    @Body('chatId') chatId: number,
    @Body('dateCreated') dateCreated: Date,
    @Body('isRead') isRead: boolean,
  ): Promise<Message> {
    return this.messageService.createMessage(userFrom, chatId, dateCreated, isRead);
  }

  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiResponse({ status: 200, description: 'Returns the message with the specified ID.', type: Message })
  @Get(':id')
  getMessageById(@Param('id') id: number): Promise<Message> {
    return this.messageService.getMessageById(id);
  }
}