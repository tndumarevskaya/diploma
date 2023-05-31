import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { MessageService } from './message/message.service';
import { MessageController } from './message/message.controller';
import { ChatGateway } from './chat.gateway';
import { Chat } from './chat.model';
import { Message } from './message/message.model';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { MessageGateway } from './message/message.gateway';

@Module({
  controllers: [ChatController, MessageController],
  providers: [ChatService, MessageService, ChatGateway, MessageGateway],
  imports: [
    SequelizeModule.forFeature([Chat, Message, User]),
    UserModule
  ],
  exports: [
    MessageService,
    ChatService
  ]
})
export class ChatModule {}
