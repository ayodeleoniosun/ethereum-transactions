import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {IsDefined, IsEmail, IsString, MaxLength} from "class-validator";

@Entity({name: 'users'})

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 255, nullable: false})
    @IsDefined()
    @IsString()
    @MaxLength(255, {message: 'Firstname must not exceed 100 characters'})
    firstname: string;

    @Column({type: 'varchar', length: 255, nullable: false})
    @IsDefined()
    @IsString()
    @MaxLength(255, {message: 'Lastname must not exceed 100 characters'})
    lastname: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    @IsDefined()
    @IsEmail()
    email: string;

    @Column({type: 'varchar', nullable: false})
    @IsDefined()
    @IsString()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export interface IUserDto {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
}