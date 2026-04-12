import { IsString, IsNotEmpty, MinLength, IsOptional, IsMongoId } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty({ message: "Title is required" })
    @MinLength(3, { message: "Title must be at least 3 characters" })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    @MinLength(10, { message: "Description must be at least 10 characters" })
    description!: string;
}

export class UpdatePostDto {
    @IsString()
    @IsOptional()
    @MinLength(3)
    title?: string;

    @IsString()
    @IsOptional()
    @MinLength(10)
    description?: string;
}

export class ParamsIdDto {
    @IsMongoId({ message: "Invalid ID format" })
    id!: string;
}