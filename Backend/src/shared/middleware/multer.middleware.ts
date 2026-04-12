import multer from "multer";

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const allowedTyypes = ['image/png', 'image/jpeg', 'image/webp']
        if (allowedTyypes.includes(file.mimetype)) cb(null, true)
        else cb(new Error("Invalid file type. Only PNG, JPEG and WEBP are allowed."))
    }
}
)
export default upload