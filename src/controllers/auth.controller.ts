import {Response} from 'express';
import {ResponseDto} from "../dtos/responses/response.dto";
import {ResponseStatus} from "../dtos/responses/response.interface";
import {SuccessMessages} from "../utils/enums/success.messages";
import {UserRegisterPayloadDto} from "../dtos/auth/user.register.payload.dto";
import {Service} from 'typedi';
import {Body, JsonController, Post, Res} from "routing-controllers";
import {AuthService} from "../services/auth.service";
import * as HttpStatus from 'http-status';
import {UserLoginPayloadDto} from "../dtos/auth/user.login.payload.dto";

@JsonController('/api/auth')
@Service()
export class AuthController {
    public constructor(private authService: AuthService) {
    }

    @Post('/register')
    async register(@Body() userRegisterPayloadDto: UserRegisterPayloadDto, @Res() res: Response) {
        try {
            const user = await this.authService.register(userRegisterPayloadDto);

            const successResponse = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.REGISTRATION_SUCCESSFUL, user);

            return res.status(HttpStatus.CREATED).json(successResponse);

        } catch (error) {
            const errorResponse = new ResponseDto(ResponseStatus.ERROR, error.message);

            return res.status(error.statusCode ?? HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    };

    @Post('/login')
    async login(@Body() userLoginPayloadDto: UserLoginPayloadDto, @Res() res: Response) {
        try {
            const user = await this.authService.login(userLoginPayloadDto);

            const successResponse = new ResponseDto(ResponseStatus.SUCCESS, SuccessMessages.LOGIN_SUCCESSFUL, user);

            return res.status(HttpStatus.OK).json(successResponse);

        } catch (error) {
            const errorResponse = new ResponseDto(ResponseStatus.ERROR, error.message);

            return res.status(error.statusCode ?? HttpStatus.BAD_REQUEST).json(errorResponse);
        }
    };
}