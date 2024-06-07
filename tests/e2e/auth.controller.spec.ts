import request from "supertest";
import {app} from '../../src/app';
import {ErrorMessages} from "../../src/utils/enums/error.messages";
import * as HttpStatus from 'http-status';
import {ResponseStatus} from "../../src/dtos/responses/response.interface";
import {closeDatabase, connectToDatabase} from "../../src/connections/database";
import {UserRepository} from "../../src/repositories/user.repository";
import {registerPayload} from "../fixtures/user.payload";
import {SuccessMessages} from "../../src/utils/enums/success.messages";

describe('AuthController', () => {
    const userRepository = new UserRepository();

    beforeAll(async () => {
        await connectToDatabase();
    });

    beforeEach(async () => {
        await userRepository.deleteAll();
    });

    afterAll(async () => {
        await userRepository.deleteAll();
        await closeDatabase();
    });

    const baseUrl = '/api/auth';

    describe('POST: /api/auth/register', () => {
        it('it cannot create new user if invalid email is supplied', async () => {
            let payload = JSON.parse(JSON.stringify(registerPayload));
            payload.email = 'invalidEmail';

            const response = await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(payload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
            expect(data.status).toBe(ResponseStatus.ERROR);
            expect(data.message).toBe(ErrorMessages.INVALID_EMAIL_SUPPLIED);
        });

        it('it cannot create new user if password has less than 8 characters', async () => {
            let payload = JSON.parse(JSON.stringify(registerPayload));
            payload.password = '123456';

            const response = await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(payload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
            expect(data.status).toBe(ResponseStatus.ERROR);
            expect(data.message).toBe(ErrorMessages.PASSWORD_MIN_LEGNTH_ERROR);
        });

        it('it should throw an error if email already exist during registration', async () => {
            await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const response = await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.CONFLICT);
            expect(data.status).toBe(ResponseStatus.ERROR);
            expect(data.message).toBe(ErrorMessages.USER_ALREADY_EXISTS);
        });

        it('it can create new user', async () => {
            const response = await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.CREATED);
            expect(data.status).toBe(ResponseStatus.SUCCESS);
            expect(data.message).toBe(SuccessMessages.REGISTRATION_SUCCESSFUL);
        });
    });

    describe('POST: /api/auth/login', () => {
        it('it should throw an error if user does not exist during login', async () => {
            const response = await request(app)
                .post(`${baseUrl}/login`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
            expect(data.status).toBe(ResponseStatus.ERROR);
            expect(data.message).toBe(ErrorMessages.USER_NOT_FOUND);
        });

        it('it should throw an error if login credentials are invalid', async () => {
            //register user first

            await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            let payload = JSON.parse(JSON.stringify(registerPayload));
            payload.password = '123456';

            //attempt to login

            const response = await request(app)
                .post(`${baseUrl}/login`)
                .set('Accept', 'application/json')
                .send(payload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.BAD_REQUEST);
            expect(data.status).toBe(ResponseStatus.ERROR);
            expect(data.message).toBe(ErrorMessages.INCORRECT_LOGIN_CREDENTIALS);
        });

        it('it should login if correct credentials are supplied', async () => {
            await request(app)
                .post(`${baseUrl}/register`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const response = await request(app)
                .post(`${baseUrl}/login`)
                .set('Accept', 'application/json')
                .send(registerPayload);

            const data = JSON.parse(response.text);

            expect(response.statusCode).toBe(HttpStatus.OK);
            expect(data.status).toBe(ResponseStatus.SUCCESS);
            expect(data.message).toBe(SuccessMessages.LOGIN_SUCCESSFUL);
        });
    });
});
