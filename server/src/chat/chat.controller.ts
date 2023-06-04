import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Chat } from './chat.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { Message } from './message/message.model';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @ApiOperation({ summary: 'Create a chat' })
  @ApiResponse({
    status: 201,
    description: 'The chat has been successfully created.',
    type: Chat,
  })
  @Post()
  async createChat(@Body() createChatDto: CreateChatDto) {
    return await this.chatService.createChat(createChatDto);
  }

  @Post('message')
  async postMessage(@Body() createMessageDto: CreateMessageDto) {
    return await this.chatService.postMessage(createMessageDto);
  }

  @Get('message')
  async getMessages(@Query('chat_id') chat_id: number): Promise<Message[]> {
    return await this.chatService.getMessages(chat_id);
  }

  @Get('chats')
  async getChats(@Query('user_one_id') user_one_id: number): Promise<Chat[]> {
    return await this.chatService.getChats(user_one_id);
  }
}