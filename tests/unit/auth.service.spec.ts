import {AuthService} from "../../src/services/auth.service";
import {UserRepository} from "../../src/repositories/user.repository";
import {getUser} from "../fixtures/user.fixture";
import {UserRegisterPayloadDto} from "../../src/dtos/auth/user.register.payload.dto";
import {faker} from "@faker-js/faker";
import {ErrorMessages} from "../../src/utils/enums/error.messages";
import {UserDto} from "../../src/dtos/user.dto";
import {UserLoginPayloadDto} from "../../src/dtos/auth/user.login.payload.dto";

describe('AuthService', () => {
    let userRepository: UserRepository;
    let service: AuthService;

    beforeAll(async () => {
        userRepository = new UserRepository();
        service = new AuthService(userRepository);
    });

    let findUserByEmail: jest.SpyInstance;
    let createUserMock: jest.SpyInstance;

    beforeEach(() => {
        findUserByEmail = jest.spyOn(userRepository, 'findUserByEmail');
        createUserMock = jest.spyOn(userRepository, 'create');
    });

    afterEach(() => {
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    describe('User Registration', () => {
        it('it should throw an error if email already exist', async () => {
            const mockUserData = getUser();
            findUserByEmail.mockResolvedValue(mockUserData);

            const payload = new UserRegisterPayloadDto();
            payload.firstname = faker.internet.displayName();
            payload.lastname = faker.internet.displayName();
            payload.email = faker.internet.email();
            payload.password = '123456';

            try {
                await service.register(payload);
            } catch (e: any) {
                expect(findUserByEmail).toBeCalledTimes(1);
                expect(createUserMock).toBeCalledTimes(0);
                expect(e.message).toBe(ErrorMessages.USER_ALREADY_EXISTS);
            }
        });

        it('it can create new user', async () => {
            const mockUserData = getUser();
            findUserByEmail.mockResolvedValue(null);
            createUserMock.mockResolvedValue(mockUserData);

            const payload = new UserRegisterPayloadDto();
            payload.firstname = faker.internet.displayName();
            payload.lastname = faker.internet.displayName();
            payload.email = faker.internet.email();
            payload.password = '12345678';

            const registeredUser = await service.register(payload);
            expect(registeredUser).toBeInstanceOf(UserDto);
            expect(registeredUser).toHaveProperty('id', mockUserData.id);
            expect(registeredUser).toHaveProperty('email', mockUserData.email);
        });
    });

    describe('Login', () => {
        it('it should throw an error if user does not exist during login', async () => {
            findUserByEmail.mockResolvedValue(null);

            const payload = new UserLoginPayloadDto();
            payload.email = faker.internet.email();
            payload.password = '123456';

            try {
                await service.login(payload);
            } catch (e: any) {
                expect(e.message).toBe(ErrorMessages.USER_NOT_FOUND);
            }
        });

        it('it should throw an error if login credentials are invalid', async () => {
            const mockUserData = getUser();
            findUserByEmail.mockResolvedValue(mockUserData);

            const payload = new UserLoginPayloadDto();
            payload.email = faker.internet.email();
            payload.password = '123456';

            try {
                await service.login(payload);
            } catch (e: any) {
                expect(e.message).toBe(ErrorMessages.INCORRECT_LOGIN_CREDENTIALS);
            }
        });

        it('it should login if correct credentials are supplied', async () => {
            const mockUserData = getUser();
            findUserByEmail.mockResolvedValue(mockUserData);

            const payload = new UserLoginPayloadDto();
            payload.email = mockUserData.email;
            payload.password = '12345678';

            const loggedInUser = await service.login(payload);
            const response = JSON.parse(JSON.stringify(loggedInUser));
            expect(loggedInUser).toBeInstanceOf(Object);
            expect(loggedInUser).toHaveProperty('token');
            expect(response.user.email).toBe(payload.email);
        });
    });
});