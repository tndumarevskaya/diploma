import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService, private readonly messageService: MessageService) {}

  handleConnection(socket: Socket) {
    console.log(`User connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket) {
    console.log(`User disconnected: ${socket.id}`);
  }

  @SubscribeMessage('joinChatRoom')
  async handleJoinChatRoom(socket: Socket, chatId: number) {
    socket.join(`chat_${chatId}`);
    console.log(`User ${socket.id} joined chat room ${chatId}`);

    this.server.to(`chat_${chatId}`).emit('userJoined', { chatId, userId: socket.id });
  }

  @SubscribeMessage('leaveChatRoom')
  async handleLeaveChatRoom(socket: Socket, chatId: number) {
    socket.leave(`chat_${chatId}`);
    console.log(`User ${socket.id} left chat room ${chatId}`);

    this.server.to(`chat_${chatId}`).emit('userLeft', { chatId, userId: socket.id });
  }

  @SubscribeMessage('sendMessage')
  async handleSendMessage(socket: Socket, data: { chatId: number; userFrom: number; message: string }) {
    const { chatId, userFrom, message } = data;

    const newMessage = await this.messageService.createMessage(userFrom, chatId, null, false);

    this.server.to(`chat_${chatId}`).emit('messageReceived', newMessage);
  }
}