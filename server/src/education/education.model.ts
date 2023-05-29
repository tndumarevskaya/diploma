import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'education' })
export class Education extends Model<Education> {
  @ApiProperty({ example: 1, description: 'Education ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  education_id: number;

  @ApiProperty({ example: 'Как дрессировать собаку', description: 'Title of the article' })
  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'Текст статьи', description: 'Text of the article' })
  @Column({ type: DataType.STRING })
  text: string;
}