import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = Router()
const userController = new UserController()

userRouter.post('/user-info', userController.getUserInfo)
userRouter.post('/user-update',userController.updateUserInfo)
userRouter.post('/user-delete', userController.deleteUser)

export default userRouter