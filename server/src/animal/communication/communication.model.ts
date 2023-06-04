import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface CommunicationCreationAttrs {
    value: string;
}

@Table({ tableName: 'communication', timestamps: false })
export class Communication extends Model<Communication, CommunicationCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    id: number;

    @ApiProperty({ example: 'Good with children', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}