// This is the correct syntax from "router"
import { Router } from "express"
import { FavController } from "../controllers/fav.controller"


    const favRouter = Router()
    const favController = new FavController()

    favRouter.post('/fav', favController.fav)
    favRouter.post('/delfav', favController.deleteFav)
    favRouter.post('/isfav', favController.isFav)
    favRouter.post('/test', favController.isTest)

    


export default favRouter