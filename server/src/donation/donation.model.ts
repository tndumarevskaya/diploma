import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'donation' })
export class Donation extends Model<Donation> {
  @ApiProperty({ example: 1, description: 'Unique ID of the donation' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  donation_id: number;

  @ApiProperty({ example: 'Tatiana', description: 'Name of the donor' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '2023-03-01', description: 'Date of the donation' })
  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @ApiProperty({ example: 2300, description: 'Amount of the donation in rubles' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  amount: number;

  @ApiProperty({ example: 'На лечение Бобика', description: 'Purpose of the donation' })
  @Column({ type: DataType.STRING })
  aim: string;
}