import { toFile } from "@imagekit/nodejs";
import { imageKit } from "../../config/imagekit"
import { ApiError } from "../utils/api-error";

export class ImageKitService {
    uploadImage = async (file: Express.Multer.File, folder: string = "posts") => {
        try {
            const fileName = `${Date.now()}-${file.originalname}`
            const result = await imageKit.files.upload({
                file: await toFile(file.buffer, fileName, { type: file.mimetype }),
                fileName,
                folder,
                useUniqueFileName: true
            })
            return {
                url: result.url,
                fileId: result.fileId
            }
        } catch (error) {
            throw new ApiError(500, "Cloud upload failed")
        }
    }

    deleteImage = async (fileId: string) => {
        try {
            await imageKit.files.delete(fileId)
        } catch (error: any) {
            if (error.status == 404) return
            throw new ApiError(500, "Cloud deletion failed")

        }
    }
}