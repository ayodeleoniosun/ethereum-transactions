import {User} from "../../src/entities/user.entity";
import {faker} from "@faker-js/faker";
import {hashPassword} from "../../src/utils/helpers/password_hash";

export const getUser = (overrides?: Partial<User>): Partial<User> => {
    const user = new User();
    user.id = faker.number.int({min: 10, max: 100});
    user.firstname = faker.internet.displayName();
    user.lastname = faker.internet.displayName();
    user.email = faker.internet.email();
    user.password = hashPassword('12345678');
    user.createdAt = new Date();
    user.updatedAt = new Date();
    return {...user, ...overrides};
};