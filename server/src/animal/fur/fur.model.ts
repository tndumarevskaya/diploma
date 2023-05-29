import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface FurCreationAttrs {
    value: string;
}

@Table({ tableName: 'fur', timestamps: false })
export class Fur extends Model<Fur, FurCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    furId: number;

    @ApiProperty({ example: 'Cat', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}