import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";
import { UserRoles } from "../../../shared/types/user.enum";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema<IUser>({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: UserRoles,
        default: UserRoles.USER
    }
}, {timestamps: true})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return 
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function(providedPassword: string) : Promise<boolean>{
    return await bcrypt.compare(providedPassword, this.password)
}

export const User = mongoose.model<IUser>("User", userSchema)