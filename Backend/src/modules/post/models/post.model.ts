import { model, Schema } from "mongoose";
import { IPost } from "../interfaces/post.interface";

const postSchema = new Schema<IPost>({
    image: {
        url: { type: String, required: true },
        fileId: { type: String, required: true }
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export const Post = model('Post', postSchema)