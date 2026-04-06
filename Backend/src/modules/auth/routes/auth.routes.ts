import { NextFunction, Router, Request, Response } from "express";
import { validateDto } from "../../../shared/middleware/validation-middleware";
import { RegisterDto } from "../dtos/register.dto";
import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.service";
import { UserService } from "../../user/services/user.service";
import { LoginDto } from "../dtos/login.dto";
import { RefreshTokenDto } from "../dtos/refresh-token.dto";

const authRouter = Router()
const userService = new UserService()
const authService = new AuthService(userService)
const authController = new AuthController(authService)

authRouter.post('/register',validateDto(RegisterDto), authController.register)
authRouter.post('/login', validateDto(LoginDto), authController.login)
authRouter.post('/refresh-token', validateDto(RefreshTokenDto), authController.refreshToken)
export default authRouter