import { HydratedDocument } from "mongoose";
import { UserRoles } from "../../../shared/types/user.enum";

export interface IUser{
    name: string;
    password: string;
    role: UserRoles
    email: string

    comparePassword(candidatePassword: string): Promise<boolean>;
}

export type IUserDocument = HydratedDocument<IUser>