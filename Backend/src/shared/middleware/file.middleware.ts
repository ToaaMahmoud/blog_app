import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api-error';

export const requireFile = (fieldName: string) =>{
    return (req: Request, res: Response, next: NextFunction) =>{
        if(!req.file || req.file.fieldname !== fieldName){
            return next(new ApiError(400, `${fieldName} file is required`))
        }
        next()
    }
}