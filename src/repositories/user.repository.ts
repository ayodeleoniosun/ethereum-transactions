import {User} from "../entities/user.entity";
import {dataSource} from "../connections/ormconfig";
import {Service} from "typedi";
import {UserRegisterPayloadDto} from "../dtos/auth/user.register.payload.dto";

@Service()
export class UserRepository {
    async create(item: Partial<UserRegisterPayloadDto>): Promise<User> {
        const userRepository = await dataSource.getRepository(User);
        const newUser = await userRepository.create(item);
        return await userRepository.save(newUser);
    }

    async findUserByEmail(email: string): Promise<User> {
        return await dataSource.getRepository(User).findOne({where: {email}});
    }

    async findById(id: number): Promise<User> {
        return await dataSource.getRepository(User).findOne({where: {id}});
    }

    async deleteAll(): Promise<void> {
        await dataSource.getRepository(User).delete({});
    }
}