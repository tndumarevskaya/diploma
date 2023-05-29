import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { ChatGateway } from './chat.gateway';

@Module({
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService, ChatGateway],
})
export class ChatModule {}
