import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Adopter } from '../user/user.model';
import { Animal } from '../animal/animal.model';

@Table({ tableName: 'favorite' })
export class Favorite extends Model<Favorite> {
  @ApiProperty({ example: 1, description: 'Favorite ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  favorite_id: number;

  @ApiProperty({ example: 1, description: 'ID of the adopter' })
  @ForeignKey(() => Adopter)
  @Column({ type: DataType.INTEGER, allowNull: false })
  adopter_id: number;

  @ApiProperty({ example: 1, description: 'ID of the animal' })
  @ForeignKey(() => Animal)
  @Column({ type: DataType.INTEGER, allowNull: false })
  animal_id: number;

  @BelongsTo(() => Adopter)
  adopter: Adopter;

  @BelongsTo(() => Animal)
  animal: Animal;
}