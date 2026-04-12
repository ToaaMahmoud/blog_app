import ImageKit from "@imagekit/nodejs";
import { env } from "./env";

export const imageKit = new ImageKit({
    privateKey:env.IMAGEKIT_PRIVATE_KEY,
})