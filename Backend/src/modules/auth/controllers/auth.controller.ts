import { AuthService } from "../services/auth.service";
import { Request, Response } from "express";
export class AuthController{
    constructor(private authService: AuthService){}

    register = async(req: Request, res: Response)=>{
        const {user, accessToken, refreshToken} = await this.authService.register(req.body)
        res.status(201).json({
            status: "Success",
            data:{
                user,
                accessToken,
                refreshToken
            }
        })
    }

    login = async(req: Request, res: Response) =>{
        const {user, accessToken, refreshToken} = await this.authService.login(req.body)
        res.status(200).json({
            status: "Success",
            data: {
                user,
                accessToken,
                refreshToken
            }
        })
    }

    refreshToken = async(req: Request, res: Response) =>{
        const {refreshToken} = req.body
        const tokens = await this.authService.refreshToken(refreshToken)
        res.status(200).json({
            status: "Success",
            tokens
        })
    }
}