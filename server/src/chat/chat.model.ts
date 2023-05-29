import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Adopter, Shelter, User, Volunteer } from "../user/user.model";

@Table({ tableName: 'chat' })
export class Chat extends Model<Chat> {

  @ApiProperty({ example: 1, description: 'Chat ID' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  chat_id: number;

  @ApiProperty({ example: 1, description: 'User One ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_one_id: number;

  @ApiProperty({ example: 2, description: 'User Two ID' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_two_id: number;

  @BelongsTo(() => User, 'user_one_id')
  userOne: User<Shelter | Volunteer | Adopter>;

  @BelongsTo(() => User, 'user_two_id')
  userTwo: User<Shelter | Volunteer | Adopter>;
}