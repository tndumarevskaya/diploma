import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';
import { Message } from './message/message.model';
import { CreateChatDto } from './dto/create-chat.dto';
import { CreateMessageDto } from './message/dto/create-message.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private chatModel: typeof Chat,
    @InjectModel(Message)
    private messageModel: typeof Message,
  ) {}

  async createChat(createChatDto: CreateChatDto): Promise<Chat> {
    const newChat = await this.chatModel.create({
      ...createChatDto,
    });
    return newChat;
  }

  async postMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const newMessage = await this.messageModel.create({
      ...createMessageDto,
    });
    return newMessage;
  }

  async getChat(chat_id: number): Promise<Chat> {
    return await this.chatModel.findByPk(chat_id, {include: {all: true}});
  }

  async getMessages(chat_id: number): Promise<Message[]> {
    const messages = await this.messageModel.findAll({
      where: { chat_id: chat_id },
      include: {all: true}
    });
    return messages;
  }

  async getChats(user_one_id: number): Promise<Chat[]> {
    const chats = await this.chatModel.findAll({
      where: { user_one_id: user_one_id },
      include: {all: true}
    });
    return chats;
  }
}