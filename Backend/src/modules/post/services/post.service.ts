import { Types } from 'mongoose';
import { IPost } from './../interfaces/post.interface';
import { Post } from './../models/post.model';
import { ApiError } from '../../../shared/utils/api-error';
export class PostService {
    async createPost(data: Omit<IPost, "author">, authorId: string): Promise<IPost> {
        const post = (await Post.create({ ...data, author: authorId })).populate('author', 'name email')
        return post
    }

    async getPosts(): Promise<IPost[] | null>{
        return await Post.find({}).populate('author', 'name email').lean()      
    }

    async getUserPosts(author: string): Promise<IPost[] | null>{
        return await Post.find({author}).populate('author', 'name email').lean()
    }

    async getPostById(postId: string): Promise<IPost>{
        const post = await Post.findById(postId).lean()
        if(!post) throw new ApiError(404, "Post is not found")
        return post   
    }
    async updatePost(data: Partial<IPost>, postId: string, authorId: string):Promise<{updatedPost: IPost, oldFileId?: string}>{
        const post = await this.verifyPostOwnership(postId, authorId)
        const oldFileId = post?.image.fileId
        const updatedPost = await Post.findByIdAndUpdate(postId, {$set: data}, {new: true, runValidators: true}).lean()
        if(!updatedPost) throw new ApiError(404, "Update Failed")        
        return {updatedPost, oldFileId}    
    }

    async deletePost(postId: string, authorId: string): Promise<IPost>{
        const post = await this.verifyPostOwnership(postId, authorId)
        await Post.findByIdAndDelete(postId)
        return post        
    }

    private async verifyPostOwnership(postId: string, authorId: string): Promise<IPost>{
        const post = await Post.findById(postId)
        if(!post) throw new ApiError(404, "Post is not found")
        if(!post.author.equals(authorId)) throw new ApiError(403, "You don't have permission for this post")
        return post    
    }
}