import dotenv from "dotenv";
dotenv.config()

export const env = {
    PORT :  process.env.PORT || 3000,
    MONGO_URI: process.env.MONGO_URI || '',
    JWT_SECRET: process.env.JWT_SECRET || '',
    ACCESS_TOKEN: {
        secret: process.env.ACCESS_TOKEN || '',
        expiresIn: '15m'
    },
    REFRESH_TOKEN: {
        secret: process.env.REFRESH_TOKEN || '',
        expiresIn: '7d'
    },
    NODE_ENV: process.env.NODE_ENV,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY || '',
}