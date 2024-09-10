import { Router } from "express"
import { LikeController } from "../controllers/like.controller"


    const likeRouter = Router()
    const likeController = new LikeController()

    likeRouter.post('/add-video', likeController.likeVideo)
    likeRouter.post('/del-video', likeController.deleteLikeVideo)
    likeRouter.post('/current-video', likeController.currentLikeVideo)
    likeRouter.get('/count-likes/:id', likeController.countLikes)
    likeRouter.post('/add-post',likeController.likePost)
    likeRouter.post('/del-post', likeController.deleteLikePost)
    likeRouter.post('/current-post', likeController.currentLikePost)
    likeRouter.post('/current-response', likeController.currentLikeResponse)

    likeRouter.post('/test', likeController.test)
    

export default likeRouter