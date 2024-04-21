// This is the correct syntax from "router"
import { Router } from "express"
import { SocialController } from "../controllers/social.controller"


    const socialRouter = Router()
    const socialController = new SocialController()

    socialRouter.post('/fav', socialController.fav)
    socialRouter.post('/delfav', socialController.deleteFav)
    socialRouter.post('/isfav', socialController.isFav)
    socialRouter.post('/test', socialController.isTest)

    


export default socialRouter