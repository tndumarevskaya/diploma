import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Chat } from './chat.model';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Create a chat' })
  @ApiResponse({ status: 201, description: 'The chat has been successfully created.', type: Chat })
  @Post()
  createChat(@Body('userOneId') userOneId: number, @Body('userTwoId') userTwoId: number): Promise<Chat> {
    return this.chatService.createChat(userOneId, userTwoId);
  }

  @ApiOperation({ summary: 'Get a chat by ID' })
  @ApiResponse({ status: 200, description: 'Returns the chat with the specified ID.', type: Chat })
  @Get(':id')
  getChatById(@Param('id') id: number): Promise<Chat> {
    return this.chatService.getChatById(id);
  }
}