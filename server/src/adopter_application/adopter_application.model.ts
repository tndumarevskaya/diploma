import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Adopter } from '../user/user.model';
import { Shelter } from '../user/user.model';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../application_status/application_status.model';

@Table({ tableName: 'adopter_application' })
export class AdopterApplication extends Model<AdopterApplication> {
    @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
    application_id: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    adopter_id: number;

    @ForeignKey(() => Shelter)
    @Column({ type: DataType.INTEGER })
    shelter_id: number;

    @ApiProperty({ example: 1, description: 'Status ID' })
    @ForeignKey(() => ApplicationStatus)
    @Column({ type: DataType.INTEGER, defaultValue: 1 })
    status_id: number;

    @ApiProperty({ example: 'John Doe', description: 'Name of the adopter' })
    @Column({ type: DataType.STRING })
    name: string;

    @ApiProperty({ example: 30, description: 'Age of the adopter' })
    @Column({ type: DataType.INTEGER })
    age: number;

    @ApiProperty({ example: 'New York', description: 'City of the adopter' })
    @Column({ type: DataType.STRING })
    city: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'Contact details of the adopter' })
    @Column({ type: DataType.STRING })
    contacts: string;

    @ApiProperty({ example: "4", description: 'Number of household members' })
    @Column({ type: DataType.STRING })
    members: string;

    @ApiProperty({ example: 'Apartment', description: 'Type of home (Apartment, House, etc.)' })
    @Column({ type: DataType.STRING })
    home: string;

    @ApiProperty({ example: 'Yes', description: 'Whether the adopter has a suitable place for the animal' })
    @Column({ type: DataType.STRING })
    animal_home: string;

    @ApiProperty({ example: 'No', description: 'Any allergies or health conditions' })
    @Column({ type: DataType.STRING })
    allergy: string;

    @ApiProperty({ example: 'I love animals and want to provide a loving home', description: 'Reason for adoption' })
    @Column({ type: DataType.TEXT })
    reason: string;

    @BelongsTo(() => ApplicationStatus)
    status: ApplicationStatus;

    @BelongsTo(() => Shelter)
    shelter: Shelter;
}
