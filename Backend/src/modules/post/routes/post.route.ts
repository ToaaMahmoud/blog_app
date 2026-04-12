import { Router } from "express";
import { PostController } from "../controllers/post.controller";
import { PostService } from "../services/post.service";
import { authMiddleware } from "../../../shared/middleware/auth.middleware";
import { validateDto } from "../../../shared/middleware/validation-middleware";
import { CreatePostDto, ParamsIdDto, UpdatePostDto } from "../dtos/post.dto";
import { ImageKitService } from './../../../shared/services/imageKit.service';
import upload from "../../../shared/middleware/multer.middleware";
import { requireFile } from "../../../shared/middleware/file.middleware";

const postRouter = Router()
const postService = new PostService()
const imageKitService = new ImageKitService()
const postController = new PostController(postService, imageKitService)

postRouter.post('/',authMiddleware, upload.single('image'), requireFile('image'),validateDto(CreatePostDto),postController.createPost)
postRouter.get('/user-posts',authMiddleware, postController.getUserPosts)
postRouter.get('/:id', authMiddleware, validateDto(ParamsIdDto, 'params'),postController.getPostById)
postRouter.get('/',authMiddleware, postController.getPosts)
postRouter.patch('/:id', authMiddleware, upload.single('image'), validateDto(ParamsIdDto, 'params'), validateDto(UpdatePostDto),postController.updatePost)
postRouter.delete('/:id', authMiddleware,validateDto(ParamsIdDto, 'params'),postController.deletePost)

export default postRouter