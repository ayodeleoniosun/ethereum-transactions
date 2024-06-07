export enum ErrorMessages {
    //user registration and login
    USER_ALREADY_EXISTS = 'Email already in use by another user.',
    USER_NOT_FOUND = 'User does not exist. Kindly create a new account.',
    INCORRECT_LOGIN_CREDENTIALS = 'Incorrect login details.',
    PASSWORD_MIN_LEGNTH_ERROR = 'Password cannot be less than 8 characters.',
    INVALID_EMAIL_SUPPLIED = 'Invalid email supplied',

    //authentication
    UNAUTHENTICATED_USER = 'You must be logged in to perform this operation',
    INVALID_TOKEN = 'Invalid token supplied.',
    UNAUTHORIZED_ACCESS = 'You are unauthorized to perform this operation. Kindly login.'
}