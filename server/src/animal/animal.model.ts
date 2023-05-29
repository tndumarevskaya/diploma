import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Shelter } from "../user/user.model";
import { Type } from "./type/type.model";
import { Color } from "./color/color.model";
import { Status } from "./status/status.model";
import { Gender } from "./gender/gender.model";
import { Communication } from "./communication/communication.model";
import { Fur } from "./fur/fur.model";
import { Behavior } from "./behavior/behavior.model";

export interface AnimalCreationAttrs {
    name: string;
    age: number;
    size: number;
    about: string;
}

@Table({ tableName: 'animal' })
export class Animal extends Model<Animal, AnimalCreationAttrs> {
    
    @ApiProperty({ example: '1', description: 'Unique index' })
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    animal_id: number;

    @ApiProperty({ example: '1', description: 'Shelter ID' })
    @ForeignKey(() => Shelter)
    @Column({ type: DataType.INTEGER, allowNull: false })
    shelter_id: number;

    @ApiProperty({ example: 'Bobik', description: 'Name' })
    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @ApiProperty({ example: '1', description: 'Type ID' })
    @ForeignKey(() => Type)
    @Column({ type: DataType.INTEGER, allowNull: false })
    typeId: number;

    @ApiProperty({ example: '2', description: 'Age' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    age: number;

    @ApiProperty({ example: '1', description: 'Color ID' })
    @ForeignKey(() => Color)
    @Column({ type: DataType.INTEGER, allowNull: false })
    colorId: number;

    @ApiProperty({ example: '1', description: 'Status ID' })
    @ForeignKey(() => Status)
    @Column({ type: DataType.INTEGER, allowNull: false })
    statusId: number;

    @ApiProperty({ example: '1', description: 'Gender ID' })
    @ForeignKey(() => Gender)
    @Column({ type: DataType.INTEGER, allowNull: false })
    genderId: number;

    @ApiProperty({ example: '32', description: 'Size in centimeters' })
    @Column({ type: DataType.INTEGER, allowNull: false })
    size: number;

    @ApiProperty({ example: '1', description: 'Communication ID' })
    @ForeignKey(() => Communication)
    @Column({ type: DataType.INTEGER, allowNull: false })
    communicationId: number;

    @ApiProperty({ example: '1', description: 'Fur ID' })
    @ForeignKey(() => Fur)
    @Column({ type: DataType.INTEGER, allowNull: false })
    furId: number;

    @ApiProperty({ example: '1', description: 'Behavior ID' })
    @ForeignKey(() => Behavior)
    @Column({ type: DataType.INTEGER, allowNull: false })
    behaviorId: number;

    @ApiProperty({ example: 'Lava игривая, активная, любит различные развлечения и игрушки, любит находиться в центре внимания, дурачиться и веселиться.', description: 'About' })
    @Column({ type: DataType.STRING, allowNull: false })
    about: string;

    @BelongsTo(() => Shelter)
    shelter: Shelter;

    @BelongsTo(() => Type)
    type: Type;

    @BelongsTo(() => Color)
    color: Color;

    @BelongsTo(() => Status)
    status: Status;

    @BelongsTo(() => Gender)
    gender: Gender;

    @BelongsTo(() => Communication)
    communication: Communication;

    @BelongsTo(() => Fur)
    fur: Fur;

    @BelongsTo(() => Behavior)
    behavior: Behavior;
}