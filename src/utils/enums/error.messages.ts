export enum ErrorMessages {
    //user registration and login
    USER_ALREADY_EXISTS = 'Email already in use by another user.',
    USER_NOT_FOUND = 'User does not exist. Kindly create a new account.',
    INCORRECT_LOGIN_CREDENTIALS = 'Incorrect login details.',
    FIRSTNAME_REQUIRED = 'Firstname is required',
    LASTNAME_REQUIRED = 'Lastname is required',
    EMAIL_REQUIRED = 'Email is required',
    PASSWORD_REQUIRED = 'Password is required',
    PASSWORD_CONFIRMATION_REQUIRED = 'Password confirmation is required',
    FIRSTNAME_MIN_LEGNTH_ERROR = 'Firstname cannot be less than 3 characters.',
    LASTNAME_MIN_LEGNTH_ERROR = 'Lastname cannot be less than 3 characters.',
    PASSWORD_MIN_LEGNTH_ERROR = 'Password cannot be less than 8 characters.',
    PASSWORDS_DO_NOT_MATCH = 'Passwords do not match',
    INVALID_EMAIL_SUPPLIED = 'Invalid email supplied',
    
    //authentication
    UNAUTHENTICATED_USER = 'You must be logged in to perform this operation',
    INVALID_TOKEN = 'Invalid token supplied.',
    UNAUTHORIZED_ACCESS = 'You are unauthorized to perform this operation. Kindly login.'
}