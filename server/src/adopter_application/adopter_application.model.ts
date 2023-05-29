import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Adopter } from '../user/user.model';
import { Shelter } from '../user/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../application_status/application_status.model';

@Table({ tableName: 'adopter_application' })
export class AdopterApplication extends Model<AdopterApplication> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  application_id: number;

  @ForeignKey(() => Adopter)
  @Column({ type: DataType.INTEGER, allowNull: false })
  adopter_id: number;

  @ForeignKey(() => Shelter)
  @Column({ type: DataType.INTEGER })
  shelter_id: number;

  @Column({ type: DataType.STRING, unique: true })
  application_number: string;

  @ApiProperty({ example: 1, description: 'Status ID' })
  @ForeignKey(() => ApplicationStatus)
  @Column({ type: DataType.INTEGER })
  status_id: number;

  @BelongsTo(() => ApplicationStatus)
  status: ApplicationStatus;
}