// This is the correct syntax from "router"
import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"


    const router = Router()
    const authController = new AuthController()

    router.post('/signin', authController.signin)
    router.post('/signup', authController.signup)

    


export default router