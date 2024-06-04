import {UserRegisterPayloadDto} from "../dtos/user.register.payload.dto";
import {UserDto} from "../dtos/user.dto";
import bcrypt from 'bcryptjs';
import HttpException from "../utils/exceptions/http.exception";
import {ErrorMessages} from "../utils/enums/error.messages";
import * as HttpStatus from 'http-status';
import {Service} from "typedi";
import {IUserDto} from "../entities/user.entity";
import {UserRepository} from "../repositories/user.repository";

@Service()
export class AuthService {
    public constructor(private userRepository: UserRepository) {
    }

    async register(user: UserRegisterPayloadDto): Promise<IUserDto> {
        const existingUser = await this.userRepository.findUserByEmail(user.email);

        if (existingUser) {
            throw new HttpException(ErrorMessages.USER_ALREADY_EXISTS, HttpStatus.CONFLICT);
        }

        const newUser = await this.userRepository.create({
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: bcrypt.hashSync(user.password, 10)
        });

        return new UserDto(newUser);
    }
}