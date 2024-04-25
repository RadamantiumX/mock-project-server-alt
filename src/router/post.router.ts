import { Router } from "express"
import { PostController } from "../controllers/post.controller"


    const postRouter = Router()
    const postController = new PostController()

    postRouter.post('/newpost', postController.post)
    postRouter.post('/allpost', postController.allPosts)
    

export default postRouter