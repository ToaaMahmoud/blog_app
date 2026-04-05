import {NextFunction, Request, Response} from "express";
import {plainToInstance} from "class-transformer";
import {validate, ValidationError} from "class-validator";
import { ApiError } from "../utils/api-error";


export function validateDto(dtoClass: any, source: 'body' | 'query' | 'params' = 'body') {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req[source]);
        const errors: ValidationError[] = await validate(dtoInstance, {whitelist: true, forbidNonWhitelisted: true});

        if (errors.length > 0) {
            const errorMessages = errors.map((error) => Object.values(error.constraints || {}).join(', ')).join('; ');
            throw new ApiError(400, `Validation failed: ${errorMessages}`);
        }

        if (source === 'query' || source === 'params') {
            for (const key in req[source]) {
                delete req[source][key];
            }
            Object.assign(req[source], dtoInstance);
        } else {
            req.body = dtoInstance;
        }
        next();
    }
}