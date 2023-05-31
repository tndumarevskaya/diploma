import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './chat.model';

@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat) private chatModel: typeof Chat) {}

  async createChat(userOneId: number, userTwoId: number): Promise<Chat> {
    const chat = await this.chatModel.create({
      user_one_id: userOneId,
      user_two_id: userTwoId,
    });
    return chat;
  }

  async getChatById(chatId: number): Promise<Chat> {
    const chat = await this.chatModel.findByPk(chatId);
    return chat;
  }

  async getAllChats(user_one_id?: number): Promise<Chat[]> {
    const chats = await this.chatModel.findAll({where: {user_one_id: user_one_id}});
    return chats;
  }

}
