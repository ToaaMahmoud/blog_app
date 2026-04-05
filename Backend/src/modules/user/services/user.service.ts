import { ApiError } from "../../../shared/utils/api-error";
import { RegisterDto } from "../../auth/dtos/register.dto";
import { IUserDocument } from "../interfaces/user.interface";
import { User } from "../models/user.model";

export class UserService{
    async createUser(userData: RegisterDto): Promise<IUserDocument>{
        const userExist = await User.findOne({email: userData.email})
        if(userExist) throw new ApiError(400, 'Email already in use')
        const user = new User({...userData})  
        return await user.save()  
    }
    async getUserByEmail(email: string):Promise<IUserDocument | null>{
        return await User.findOne({email})
    }
}
export const userService = new UserService()