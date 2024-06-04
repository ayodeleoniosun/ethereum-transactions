import {User} from "../entities/user.entity";
import {connectionOptions} from "../database/ormconfig";
import {Service} from "typedi";
import {UserRegisterPayloadDto} from "../dtos/user.register.payload.dto";

@Service()
export class UserRepository {
    async create(item: Partial<UserRegisterPayloadDto>): Promise<User> {
        const userRepository = await connectionOptions.getRepository(User);
        const newUser = await userRepository.create(item);
        return await userRepository.save(newUser);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await connectionOptions.getRepository(User).findOne({where: {email}});
    }
}