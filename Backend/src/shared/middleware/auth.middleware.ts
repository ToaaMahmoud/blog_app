import {NextFunction, Request, Response} from "express";
import { ApiError } from "../utils/api-error";
import { JwtService } from "../../modules/auth/services/jwt.service";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        throw new ApiError(401, 'Authorization header missing');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        throw new ApiError(401, 'Token missing from Authorization header');
    }

    req.user = JwtService.verifyAccessToken(token)
    next();
};