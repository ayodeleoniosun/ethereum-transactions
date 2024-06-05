import {UserRegisterPayloadDto} from "../dtos/auth/user.register.payload.dto";
import {UserDto} from "../dtos/user.dto";
import HttpException from "../utils/exceptions/http.exception";
import {ErrorMessages} from "../utils/enums/error.messages";
import * as HttpStatus from 'http-status';
import {Service} from "typedi";
import {IUserDto} from "../entities/user.entity";
import {UserRepository} from "../repositories/user.repository";
import {UserLoginPayloadDto} from "../dtos/auth/user.login.payload.dto";
import {comparePassword, hashPassword} from "../utils/helpers/password_hash";
import {generateToken} from "../utils/helpers/jwt";

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
            password: hashPassword(user.password)
        });

        return new UserDto(newUser);
    }

    async login(user: UserLoginPayloadDto): Promise<object> {
        const existingUser = await this.userRepository.findUserByEmail(user.email);

        if (!existingUser) {
            throw new HttpException(ErrorMessages.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        const result = comparePassword(user.password, existingUser.password);

        if (!result) {
            throw new HttpException(ErrorMessages.INCORRECT_LOGIN_CREDENTIALS);
        }

        const token = await generateToken(existingUser);

        if (token) {
            return {
                token,
                user: new UserDto(existingUser)
            }
        }
    }
}