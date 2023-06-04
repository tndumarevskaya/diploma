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

  @ApiProperty({ example: 1, description: 'Status ID' })
  @ForeignKey(() => ApplicationStatus)
  @Column({ type: DataType.INTEGER, defaultValue: 1 })
  status_id: number;

  @ApiProperty({ example: 'John Doe', description: 'Name' })
  @Column({ type: DataType.STRING })
  name: string;

  @ApiProperty({ example: 25, description: 'Age' })
  @Column({ type: DataType.INTEGER })
  age: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Contacts' })
  @Column({ type: DataType.STRING })
  contacts: string;

  @ApiProperty({ example: 'Interested in volunteering', description: 'Reason' })
  @Column({ type: DataType.STRING })
  reason: string;

  @ApiProperty({ example: "Да, я была у вас много раз", description: 'Visited the shelter' })
  @Column({ type: DataType.STRING })
  visited: string;

  @ApiProperty({ example: "Я могу в чт, пт", description: 'Number of times per week the volunteer can visit' })
  @Column({ type: DataType.STRING })
  frequency: string;

  @ApiProperty({ example: "Да, у меня была собака", description: 'Has a dog' })
  @Column({ type: DataType.STRING })
  hasDog: string;

  @ApiProperty({ example: 'Previous experience with dogs', description: 'Experience' })
  @Column({ type: DataType.STRING })
  experience: string;

  @BelongsTo(() => ApplicationStatus)
  status: ApplicationStatus;

  @BelongsTo(() => Shelter)
  shelter: Shelter;
}