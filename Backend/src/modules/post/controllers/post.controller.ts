import { NextFunction, Request, Response } from 'express';
import { PostService } from './../services/post.service';
import { ImageKitService } from './../../../shared/services/imageKit.service';
type PostParams = {id: string}

export class PostController {
    constructor(private postService: PostService, private imageKitService: ImageKitService) {}

    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const imageData = await this.imageKitService.uploadImage(req.file!)
            
            const newPost = await this.postService.createPost({...req.body,image: imageData}, req.user.userId)
            return res.status(201).json({
                success: true,
                data: newPost
            })
        } catch (error) {
            next(error)
        }
    }
    getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts = await this.postService.getPosts(req.user.userId)
            return res.status(200).json({
                success: true,
                results: posts.length,
                data: posts
            })
        } catch (error) {
            next(error)
        }
    }
    getPostById = async (req: Request<PostParams>, res: Response, next: NextFunction) => {
        try {
            const post = await this.postService.getPostById(req.params.id)
            return res.status(200).json({
                success: true,
                data: post
            })
        } catch (error) {
            next(error)
        }
    }
    updatePost = async (req: Request<PostParams>, res: Response, next: NextFunction) => {
        let newImageData;
        try {
            if(req.file){
                newImageData = await this.imageKitService.uploadImage(req.file)
                req.body.image = newImageData
            }
            const {updatedPost, oldFileId} = await this.postService.updatePost(req.body, req.params.id, req.user.userId)
            if(newImageData && oldFileId)
                await this.imageKitService.deleteImage(oldFileId)
            return res.status(200).json({
                success: true,
                data: updatedPost
            })
        } catch (error) {
            if (newImageData) {
            await this.imageKitService.deleteImage(newImageData.fileId);
        }
            next(error)
        }
    }
    deletePost = async (req: Request<PostParams>, res: Response, next: NextFunction) => {
        try {
            const post = await this.postService.deletePost(req.params.id, req.user.userId)
            if(post && post.image.fileId){await this.imageKitService.deleteImage(post.image.fileId)}
            return res.status(200).json({
                success: true,
                message: "Post deleted successfully"
            })
        } catch (error) {
            next(error)
        }
    }
}