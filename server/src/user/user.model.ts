import { ApiProperty } from "@nestjs/swagger";
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { UserType } from "src/userType/userType.model";

export interface UserCreationAttrs {
    email: string;
    password: string;
}
  
export interface VolunteerCreationAttrs extends UserCreationAttrs {
    firstName: string;
    lastName: string;
}
  
export interface AdopterCreationAttrs extends UserCreationAttrs {
    firstName: string;
    lastName: string;
}

export interface ShelterCreationAttrs extends UserCreationAttrs {
    name: string;
}
  
@Table({tableName: 'user'})
export class User<T> extends Model<T, AdopterCreationAttrs | VolunteerCreationAttrs | ShelterCreationAttrs> {

    @ApiProperty({example: '1', description: 'Unique index'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'user@gmail.com', description: 'Email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '12345', description: 'Password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({ example: 'https://example.com/images/cat.jpg', description: 'Image URL' })
    @Column({ type: DataType.TEXT, allowNull: true })
    image: string;

    @ApiProperty({example: '79103976531', description: 'User phone number'})
    @Column({type: DataType.STRING})
    phoneNumber: string;

    // @ApiProperty({example: 'VK: https://vk.com/bfsostradanie', description: 'Socials'})
    // @Column({type: DataType.STRING})
    // social: string;

    @ApiProperty({example: 'Additional information', description: 'Additional information'})
    @Column({type: DataType.STRING})
    additionalInfo: string;

    @ApiProperty({example: 'Additional information', description: 'Additional information'})
    @ForeignKey(() => UserType)
    @Column({ type: DataType.INTEGER })
    userTypeId: number;
  
    @BelongsTo(() => UserType)
    userType: UserType;
}

@Table({tableName: 'volunteer'})
export class Volunteer extends User<Volunteer>{

    @ApiProperty({example: 'Dumarevskaya', description: 'Last name'})
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @ApiProperty({example: 'Tatiana', description: 'First name'})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @ApiProperty({example: '23', description: 'Volunteer age'})
    @Column({type: DataType.INTEGER})
    age: number;
}

@Table({tableName: 'adopter'})
export class Adopter extends User<Adopter> {

    @ApiProperty({example: 'Dumarevskaya', description: 'Last name'})
    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @ApiProperty({example: 'Tatiana', description: 'First name'})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @ApiProperty({example: '23', description: 'Adopter age'})
    @Column({type: DataType.INTEGER})
    age: number;
}

@Table({tableName: 'shelter'})
export class Shelter extends User<Shelter>{
   
    @ApiProperty({example: 'Sostradanie', description: "Shelter's name"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: '123 Main St', description: "Shelter's address"})
    @Column({type: DataType.STRING})
    address: string;

    @ApiProperty({example: '09:00 - 17:00, 10:00 - 18:00', description: 'The schedule of the shelter'})
    @Column({type: DataType.STRING})
    schedule: string;
}