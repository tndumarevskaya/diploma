import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './message.model';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessageService {
  constructor(@InjectModel(Message) private messageModel: typeof Message) {}

  async createMessage(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = await this.messageModel.create(createMessageDto);
    return message;
  }

  async getMessageById(messageId: number): Promise<Message> {
    const message = await this.messageModel.findByPk(messageId);
    return message;
  }

  async getMessages(chatId?: number): Promise<Message[]> {
    const message = await this.messageModel.findAll({where: {chat_id: chatId}, include: {all: true}});
    return message;
  }
}