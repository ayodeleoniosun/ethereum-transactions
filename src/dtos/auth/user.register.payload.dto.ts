import {IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength} from "class-validator";

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
    @IsEmail()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}