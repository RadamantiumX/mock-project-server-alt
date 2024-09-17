import { Router } from "express"
import { PostController } from "../controllers/post.controller"


    const postRouter = Router()
    const postController = new PostController()
    postRouter.post('/new-post', postController.post)
    postRouter.post('/new-response', postController.postResponse)
    postRouter.post('/new-response-response', postController.responseResponsePost)
    postRouter.get('/allpost/:id', postController.allPosts)
    postRouter.get('/count-post/:id', postController.countPosts)
    postRouter.get('/count-response/:id', postController.countPostResponses)
    postRouter.get('/count-response-response/:id', postController.countResponseResponses)
    postRouter.get('/allresponse/:id', postController.allResponsesPost)
    postRouter.get('/allresponse-responses/:id', postController.allResponsesResponse)
    postRouter.post('/del', postController.destroyPost)

    

export default postRouter