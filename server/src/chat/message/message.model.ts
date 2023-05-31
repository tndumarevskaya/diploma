import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Chat } from "../chat.model";
import { User } from "../../user/user.model";

@Table({ tableName: 'message' })
export class Message extends Model<Message> {

  @ApiProperty({ example: 1, description: 'Message ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  message_id: number;

  @ApiProperty({ example: "Hello", description: 'Message text' })
  @Column({ type: DataType.STRING })
  message_text: string;

  @ApiProperty({ example: 1, description: 'User From ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_from: number;

  @ApiProperty({ example: 1, description: 'Chat ID' })
  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  chat_id: number;

  // @ApiProperty({ example: '2023-03-01', description: 'Date Created' })
  // @Column({ type: DataType.DATE, allowNull: false })
  // date_created: Date;

  @ApiProperty({ example: false, description: 'Is Read' })
  @Column({ type: DataType.BOOLEAN, allowNull: false })
  is_read: boolean;

  @BelongsTo(() => User)
  user: number;

  @BelongsTo(() => Chat)
  chat: number;
}