import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface GenderCreationAttrs {
    value: string;
}

@Table({ tableName: 'gender', timestamps: false })
export class Gender extends Model<Gender, GenderCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    genderId: number;

    @ApiProperty({ example: 'Male', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}   