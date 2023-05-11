import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

export interface UserTypeCreationAttrs {
    value: string;
}

@Table({tableName: 'userType', timestamps: false})
export class UserType extends Model<UserType, UserTypeCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique index'})
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ApiProperty({example: 'Volunteer', description: 'Unique value of user type'})
    @Column({ type: DataType.STRING, allowNull: false })
    value: string;
}