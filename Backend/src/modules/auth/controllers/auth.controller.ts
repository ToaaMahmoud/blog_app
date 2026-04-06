import { AuthService } from "../services/auth.service";
import { NextFunction, Request, Response } from "express";
export class AuthController{
    constructor(private authService: AuthService){}

    register = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const {user, accessToken, refreshToken} = await this.authService.register(req.body)
            res.status(201).json({
                status: "Success",
                data:{
                    user,
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    login = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const {user, accessToken, refreshToken} = await this.authService.login(req.body)
            res.status(200).json({
                status: "Success",
                data: {
                    user,
                    accessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }

    refreshToken = async(req: Request, res: Response, next: NextFunction) =>{
        try {
            const {refreshToken} = req.body
            const tokens = await this.authService.refreshToken(refreshToken)
            res.status(200).json({
                status: "Success",
                tokens
            })
        } catch (error) {
            next(error)
        }
    }
}