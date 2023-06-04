import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './message/dto/create-message.dto';
import { Logger } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';


@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private chatService: ChatService) {}


  @SubscribeMessage('createMessage')
  async createMessage(
    @MessageBody() payload: CreateMessageDto,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.chatService.postMessage(payload);
    this.server.emit('message', message);
    return message;
  }

  @SubscribeMessage('findAllMessages')
  async findAllMessages(@MessageBody() chat_id: number) {
    return await this.chatService.getMessages(chat_id);
  }

  @SubscribeMessage('findAllChats')
  async findAllChats(@MessageBody() user_one_id: number) {
    return await this.chatService.getChats(user_one_id);
  }

  @SubscribeMessage('join')
  async joinRoom(@MessageBody() payload: CreateChatDto) {
    return await this.chatService.createChat(payload);
  }
}