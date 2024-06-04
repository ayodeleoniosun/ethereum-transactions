import crypto from "crypto";
//
// export const generateToken = async (user: DocumentType<User>) => {
//     return jwt.sign({id: user.id, email: user.email}, config.jwt_secret, {expiresIn: '24h'});
// }
//
// export const verifyToken = (token: string) => {
//     try {
//         return jwt.verify(token, config.jwt_secret);
//     } catch (err) {
//         throw new HttpException(ErrorMessages.INVALID_TOKEN, HttpStatus.FORBIDDEN);
//     }
// }

export const randomTokenString = async () => {
    return crypto.randomBytes(40).toString('hex');
}