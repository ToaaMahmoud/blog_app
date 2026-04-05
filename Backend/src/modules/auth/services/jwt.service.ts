import { env } from "../../../config/env";
import { ApiError } from "../../../shared/utils/api-error";
import { Payload } from "../interfaces/payload.interface";
import jwt from "jsonwebtoken";
export class JwtService{
    static generateAccessToken(payload: Payload):string{
        return jwt.sign(payload, env.ACCESS_TOKEN.secret, {expiresIn: env.ACCESS_TOKEN.expiresIn} as jwt.SignOptions) 
    }

    static verifyAccessToken(token: string):Payload{
        try {
            return jwt.verify(token, env.ACCESS_TOKEN.secret) as Payload
        } catch (error: any) {
            if(error.name === "TokenExpiredError") throw new ApiError(401, "Access Token has expired")
            if(error.name === "JsonWebTokenError") throw new ApiError(401, "Invalid access Token")
            throw new ApiError(401, `Failed to verify access token: ${error.message}`)    

        }
    }

    static generateRefreshToken(payload: Payload) : string{
        return jwt.sign(payload, env.REFRESH_TOKEN.secret, {expiresIn: env.REFRESH_TOKEN.expiresIn} as jwt.SignOptions)
    }

    static verifyRefreshToken(token: string): Payload{
        try {
            return jwt.verify(token, env.REFRESH_TOKEN.secret) as Payload
        } catch (error: any) {
            if (error.name === "TokenExpiredError") {
                throw new ApiError(401, "Refresh token has expired");
            }
            if (error.name === "JsonWebTokenError") {
                throw new ApiError(401, "Invalid refresh token");
            }
            throw new ApiError(
                401,
                `Failed to verify refresh token: ${error.message}`,
            );
        }
    }
}