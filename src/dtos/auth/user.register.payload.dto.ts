import {IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength} from "class-validator";
import {ErrorMessages} from "../../utils/enums/error.messages";

export class UserRegisterPayloadDto {
    @IsDefined()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, {message: 'Firstname must not exceed 100 characters'})
    firstname: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MaxLength(100, {message: 'Lastname must not exceed 100 characters'})
    lastname: string;

    @IsDefined()
    @IsEmail({}, {message: ErrorMessages.INVALID_EMAIL_SUPPLIED})
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @MinLength(8, {message: ErrorMessages.PASSWORD_MIN_LEGNTH_ERROR})
    password: string;
}