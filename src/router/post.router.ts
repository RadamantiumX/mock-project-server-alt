import { Router } from "express"
import { PostController } from "../controllers/post.controller"


    const postRouter = Router()
    const postController = new PostController()

    postRouter.post('/newpost', postController.post)
    postRouter.get('/allpost/:id/:type', postController.allPosts)
    postRouter.get('/allresponse', postController.allResponses)
    

export default postRouter