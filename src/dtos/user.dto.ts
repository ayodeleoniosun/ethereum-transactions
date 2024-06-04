import {IUserDto} from '../entities/user.entity';

export class UserDto implements IUserDto {
    id: number;
    firstname: string;
    lastname: string;
    email: string;

    constructor(user: UserDto) {
        for (const property in user) {
            if (user.hasOwnProperty(property)) {
                this[property] = user[property];
            }
        }
    }
}