import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { Chat } from './chat.model';
import { Message } from './message/message.model';
import { User } from 'src/user/user.model';
import { UserModule } from 'src/user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
  imports: [
    SequelizeModule.forFeature([Chat, Message, User]),
    UserModule
  ],
  exports: [
    ChatService
  ]
})
export class ChatModule {}
