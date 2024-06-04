export enum ErrorMessages {
    //user registration and login
    USER_REGISTRATION_FAILURE = 'An error occurred while creating new user. Try again',
    USER_ALREADY_EXISTS = 'Email already in use by another user.',
    USER_NOT_FOUND = 'User does not exist. Kindly create a new account.',
    INCORRECT_LOGIN_CREDENTIALS = 'Incorrect login details.',
    FIRSTNAME_REQUIRED = 'Firstname is required',
    LASTNAME_REQUIRED = 'Lastname is required',
    EMAIL_REQUIRED = 'Email is required',
    PASSWORD_REQUIRED = 'Password is required',
    INVALID_EMAIL_SUPPLIED = 'Invalid email supplied',

    //authentication
    UNAUTHENTICATED_USER = 'You must be logged in to perform this operation',
    INVALID_TOKEN = 'Invalid token supplied.',
    UNAUTHORIZED_ACCESS = 'You are unauthorized to perform this operation. Kindly login.'
}