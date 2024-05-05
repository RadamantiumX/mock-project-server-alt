import { Router } from "express"
import { LikeController } from "../controllers/like.controller"


    const likeRouter = Router()
    const likeController = new LikeController()

    likeRouter.post('/add', likeController.likeVideo)
    likeRouter.post('/del', likeController.deleteLike)
    likeRouter.post('/current', likeController.currentLike)
    

export default likeRouter