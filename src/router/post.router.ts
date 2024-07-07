import { Router } from "express"
import { PostController } from "../controllers/post.controller"


    const postRouter = Router()
    const postController = new PostController()
    postRouter.post('/new-post', postController.post)
    postRouter.post('/new-response', postController.postResponse)
    postRouter.get('/allpost/:id/:type', postController.allPosts)
    postRouter.get('/allresponse/:id', postController.allResponses)
    postRouter.post('/del', postController.destroyPost)

    

export default postRouter