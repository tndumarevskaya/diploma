import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Volunteer } from '../user/user.model';
import { Shelter } from '../user/user.model';
import { ApiProperty } from "@nestjs/swagger";
import { ApplicationStatus } from '../application_status/application_status.model';

@Table({ tableName: 'volunteer_application' })
export class VolunteerApplication extends Model<VolunteerApplication> {
  @ApiProperty({ example: 1, description: 'Application ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  application_id: number;

  @ApiProperty({ example: 1, description: 'Volunteer ID' })
  @ForeignKey(() => Volunteer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  volunteer_id: number;

  @ApiProperty({ example: 2, description: 'Shelter ID' })
  @ForeignKey(() => Shelter)
  @Column({ type: DataType.INTEGER })
  shelter_id: number;

  @ApiProperty({ example: '123', description: 'Application number' })
  @Column({ type: DataType.STRING, unique: true })
  application_number: string;

  @ApiProperty({ example: 1, description: 'Status ID' })
  @ForeignKey(() => ApplicationStatus)
  @Column({ type: DataType.INTEGER })
  status_id: number;

  @BelongsTo(() => ApplicationStatus)
  status: ApplicationStatus;
}