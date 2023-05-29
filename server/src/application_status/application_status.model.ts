import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

export interface ApplicationStatusCreationAttrs {
    value: string;
}

@Table({ tableName: 'status', timestamps: false })
export class ApplicationStatus extends Model<ApplicationStatus, ApplicationStatusCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index'})
    @PrimaryKey
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, allowNull: false })
    statusId: number;

    @ApiProperty({ example: 'Except', description: 'Unique value'})
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    value: string;
}