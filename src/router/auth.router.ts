// This is the correct syntax from "router"
import { Router } from "express"
import { AuthController } from "../controllers/auth.controller"


    const authRouter = Router()
    const authController = new AuthController()

    authRouter.post('/signin', authController.signin)
    authRouter.post('/signup', authController.signup)
    authRouter.post('/logout', authController.logout)
    authRouter.post('/token', authController.isAuthenticated)
    authRouter.post('/recovery', authController.recovery)

    


export default authRouter