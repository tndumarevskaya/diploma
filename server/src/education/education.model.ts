import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

export interface EducationCreationAttrs {
  title: string;
  text: string;
  image: string;
}

@Table({ tableName: 'education', timestamps: false })
export class Education extends Model<Education, EducationCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Education ID' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  education_id: number;

  @ApiProperty({ example: 'Как дрессировать собаку', description: 'Title of the article' })
  @Column({ type: DataType.STRING })
  title: string;

  @ApiProperty({ example: 'Текст статьи', description: 'Text of the article' })
  @Column({ type: DataType.TEXT })
  text: string;

  @ApiProperty({ example: 'https://example.com/images/cat.jpg', description: 'Image URL' })
  @Column({ type: DataType.TEXT, allowNull: true })
  image: string;
}