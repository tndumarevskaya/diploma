import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './message.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { User } from '../../user/user.model';
import { ChatService } from '../chat.service';

@WebSocketGateway()
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messageService: MessageService, private readonly chatService: ChatService) {}

  @SubscribeMessage('chat')
  async handleChat(client: Socket, payload: { chatId: number, messageText: string, userFrom: number }) {
    const messageDto: CreateMessageDto = {
      chat_id: payload.chatId,
      message_text: payload.messageText,
      user_from: payload.userFrom,
      is_read: false
    };

    const message = await this.messageService.createMessage(messageDto);
    const chat = await this.chatService.getChatById(payload.chatId);

    if (chat.user_one_id === messageDto.user_from) {
      client.to(chat.user_two_id.toString()).emit('chat', message);
    } else if (chat.user_two_id === messageDto.user_from) {
      client.to(chat.user_one_id.toString()).emit('chat', message);
    }
  }
}