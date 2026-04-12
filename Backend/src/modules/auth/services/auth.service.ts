import { ApiError } from "../../../shared/utils/api-error";
import { IUserDocument } from "../../user/interfaces/user.interface";
import { UserService } from "../../user/services/user.service";
import { LoginDto } from "../dtos/login.dto";
import { RegisterDto } from "../dtos/register.dto";
import { Payload } from "../interfaces/payload.interface";
import { JwtService } from "./jwt.service";

export class AuthService {
    constructor(private userService: UserService) { }
    async register(userData: RegisterDto) {
        const user = await this.userService.createUser(userData)
        const { accessToken, refreshToken } = this.generateTokens(user)

        const {password, __v, ...userResponse} = user.toObject();
        return {
            user: userResponse,
            accessToken,
            refreshToken
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)
        if (!user) { throw new ApiError(401, "Invalid credentials") }

        const isMatch = await user.comparePassword(loginDto.password)
        if (!isMatch) throw new ApiError(401, "Invalid credentials")

        const { accessToken, refreshToken } = this.generateTokens(user)
        const {password, __v, ...userResponse} = user.toObject()
        return {
            user: userResponse,
            accessToken,
            refreshToken
        }
    }

    async refreshToken(refreshToken: string) {
        const payload = JwtService.verifyRefreshToken(refreshToken)
        if (!payload) throw new ApiError(401, "Invalid refresh token")

        const user = await this.userService.getUserByEmail(payload.email)
        if (!user) throw new ApiError(404, "User not found")

        return this.generateTokens(user)
    }

    private generateTokens(user: IUserDocument) {
        const payload: Payload = {
            email: user.email,
            userId: user._id.toString(),
            role: user.role
        }
        const accessToken = JwtService.generateAccessToken(payload)
        const refreshToken = JwtService.generateRefreshToken(payload)
        return { accessToken, refreshToken }

    }
}