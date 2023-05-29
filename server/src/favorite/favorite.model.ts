import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Adopter } from '../user/user.model';
import { Animal } from '../animal/animal.model';

@Table({ tableName: 'favorite' })
export class Favorite extends Model<Favorite> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  favorite_id: number;

  @ForeignKey(() => Adopter)
  @Column({ type: DataType.INTEGER, allowNull: false })
  adopter_id: number;

  @ForeignKey(() => Animal)
  @Column({ type: DataType.INTEGER, allowNull: false })
  animal_id: number;

  @BelongsTo(() => Adopter)
  adopter: Adopter;

  @BelongsTo(() => Animal)
  animal: Animal;
}