import { Payload } from "../../modules/auth/interfaces/payload.interface";

declare global {
    namespace Express {
        interface Request {
            user: Payload;
        }
    }
}
export {};