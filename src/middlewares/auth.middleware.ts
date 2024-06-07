import {verifyToken} from "../utils/helpers/jwt";
import {ErrorMessages} from "../utils/enums/error.messages";
import {Socket} from "socket.io";
import {UserRepository} from "../repositories/user.repository";

export const validateToken = async (socket: Socket, next: (err?: any) => void) => {
    try {
        const userRepository = new UserRepository();

        const token = socket.handshake.auth.token;

        if (!token) {
            console.log(`Socket authentication error => ${ErrorMessages.UNAUTHENTICATED_USER}`);
            return;
        }

        const userData = verifyToken(token);

        if (typeof userData !== 'object') {
            console.log(`Socket authentication error => ${ErrorMessages.INVALID_TOKEN}`);
            return;
        }

        const isValidUser = await userRepository.findById(userData.id);

        if (!userData || !isValidUser) {
            console.log(`Socket authentication error => ${ErrorMessages.INVALID_TOKEN}`);
            return;
        }

        (socket as any).user = userData;

        return next();
    } catch (err: any) {
        console.log(`Socket authentication error => ${err.message}`);
        return;
    }
}