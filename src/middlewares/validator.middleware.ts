import {ExpressErrorMiddlewareInterface, Middleware} from 'routing-controllers';
import {Service} from "typedi";
import {ResponseDto} from "../dtos/responses/response.dto";
import {ResponseStatus} from "../dtos/responses/response.interface";
import * as HttpStatus from "http-status";

@Middleware({type: 'after'})
@Service()
export class CustomErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: any, request: any, response: any) {
        const constraints = error.errors[0].constraints;
        const errorMessage = Object.values(constraints)[0];

        const errorResponse = new ResponseDto(ResponseStatus.ERROR, errorMessage);

        return response.status(error.statusCode ?? HttpStatus.BAD_REQUEST).json(errorResponse);
    }
}