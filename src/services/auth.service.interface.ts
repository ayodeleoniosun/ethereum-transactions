import {UserRegisterPayloadDto} from "../dtos/auth/user.register.payload.dto";
import {IUserDto} from "../entities/user.entity";

export interface IAuthService {
    register(user: UserRegisterPayloadDto): Promise<IUserDto>;
}