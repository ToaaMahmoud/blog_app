import { HydratedDocument, Types } from "mongoose"

export interface IPost{
    image: {
        url: string
        fileId: string
    },
    title: string,
    description: string,
    author: Types.ObjectId
}

export type IPostDocument = HydratedDocument<IPost>