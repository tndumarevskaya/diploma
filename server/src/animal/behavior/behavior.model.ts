import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface BehaviorCreationAttrs {
    value: string;
}

@Table({ tableName: 'behavior', timestamps: false })
export class Behavior extends Model<Behavior, BehaviorCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    behaviorId: number;

    @ApiProperty({ example: 'Active', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}