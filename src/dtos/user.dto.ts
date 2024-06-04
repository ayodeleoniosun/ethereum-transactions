import {IUserDto} from '../entities/user.entity';

export class UserDto implements IUserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: Date;

    constructor(user: IUserDto) {
        this.id = user.id;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
        this.email = user.email;
        this.createdAt = user.createdAt;
    }
}