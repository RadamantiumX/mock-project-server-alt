import { Router } from "express"
import { TestController } from "../controllers/test.controller"


    const testRouter = Router()
    const testController = new TestController()

    testRouter.get('/models', testController.phubApi)
   

    


export default testRouter