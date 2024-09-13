import { Router } from "express"
import { PostController } from "../controllers/post.controller"


    const postRouter = Router()
    const postController = new PostController()
    postRouter.post('/new-post', postController.post)
    postRouter.post('/new-response', postController.postResponse)
    postRouter.get('/allpost/:id', postController.allPosts)
    postRouter.get('/count-post/:id', postController.countPosts)
    postRouter.get('/allresponse/:id', postController.allResponsesPost)
    postRouter.get('/allresponse-responses/:id')
    postRouter.post('/del', postController.destroyPost)

    

export default postRouter