export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperational = true,
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}