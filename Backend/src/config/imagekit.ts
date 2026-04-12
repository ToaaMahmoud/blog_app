import ImageKit from "imageKit";
import { env } from "./env";

export const imageKit = new ImageKit({
    publicKey: env.IMAGEKIT_PUBLIC_KEY,
    privateKey:env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: env.IMAGEKIT_URL_ENDPOINT 
})