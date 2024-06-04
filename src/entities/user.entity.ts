import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {validateOrReject} from "class-validator";

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

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        try {
            await validateOrReject(this);
        } catch (error) {
            console.log(error.message);
        }
    }
}

export interface IUserDto {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    createdAt: Date,
}