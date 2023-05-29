import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async createMessage(userFrom: number, chatId: number, dateCreated: Date, isRead: boolean): Promise<Message> {
    const message = await this.messageModel.create({
      user_from: userFrom,
      chat_id: chatId,
      date_created: dateCreated,
      is_read: isRead,
    });
    return message;
  }

  async getMessageById(messageId: number): Promise<Message> {
    const message = await this.messageModel.findByPk(messageId);
    return message;
  }
}