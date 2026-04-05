import {IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { Match } from "../../../shared/validators/match.decorator";
import { UserRoles } from "../../../shared/types/user.enum";

export class RegisterDto{
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @MinLength(6)
    @IsNotEmpty()
    password!: string

    @MinLength(6)
    @Match('password', {message: 'Passwords do not match'})
    confirmPassword!: string

     @IsEnum(UserRoles)
    @IsOptional()
    role?: string
}