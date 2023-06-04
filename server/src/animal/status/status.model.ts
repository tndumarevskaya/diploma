import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface StatusCreationAttrs {
    value: string;
}

@Table({ tableName: 'status', timestamps: false })
export class Status extends Model<Status, StatusCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    id: number;

    @ApiProperty({ example: 'Adopted', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}