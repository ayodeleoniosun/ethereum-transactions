import {NextFunction, Request, Response} from "express";
import HttpException from "../utils/exceptions/http.exception";
import {verifyToken} from "../utils/helpers/jwt";
import {ErrorMessages} from "../utils/enums/error.messages";
import * as HttpStatus from 'http-status';
import {ResponseDto} from "../dtos/responses/response.dto";
import {ResponseStatus} from "../dtos/responses/response.interface";
import {Service} from "typedi";
import {UserRepository} from "../repositories/user.repository";

@Service()
export class AuthMiddleware {
    public constructor(private userRepository: UserRepository) {
    }

    validateUserToken = async (req: Request, res: Response, next: NextFunction) => {
        try {
            let accessToken;

            if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
                accessToken = req.headers.authorization.split(" ")[1];
            }

            if (!accessToken) {
                throw new HttpException(ErrorMessages.UNAUTHENTICATED_USER, HttpStatus.UNAUTHORIZED);
            }

            const userData = verifyToken(accessToken);

            if (typeof userData !== 'object') {
                throw new HttpException(ErrorMessages.INVALID_TOKEN, HttpStatus.FORBIDDEN);
            }

            const isValidUser = await this.userRepository.findById(userData.id);

            if (!userData || !isValidUser) {
                throw new HttpException(ErrorMessages.INVALID_TOKEN, HttpStatus.FORBIDDEN);
            }

            res.locals.user = userData;

            return next();
        } catch (err: any) {
            const errorResponse = new ResponseDto(ResponseStatus.ERROR, err.message);

            return res.status(err.statusCode ?? HttpStatus.UNAUTHORIZED).json(errorResponse);
        }
    }
}