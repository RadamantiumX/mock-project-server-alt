import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = Router()
const messageController = new MessageController()

messageRouter.post('/add', messageController.message)
messageRouter.get('/all', messageController.allMessages)

export default messageRouter