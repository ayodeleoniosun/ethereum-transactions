import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity({name: 'users'})

export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length: 100, nullable: false})
    firstname: string;

    @Column({type: 'varchar', length: 100, nullable: false})
    lastname: string;

    @Column({type: 'varchar', nullable: false, unique: true})
    email: string;

    @Column({type: 'varchar', nullable: false})
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
    createdAt: Date,
}