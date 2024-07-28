import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import { validateMessageSchema } from '../schemas/validations'

export class MessageController{
    async message(req:Request, res:Response, next: NextFunction){
        
        try{
          const { name, email, message } = req.body  
          const validateMessage = validateMessageSchema(req.body)
          if(!validateMessage.success){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: JSON.parse(validateMessage.error.message)
              })
          }

          const newMessage = await prisma.message.create({
            data:{
                name: name,
                email: email,
                message: message
            }
          })

          res.status(StatusCodes.OK).json({ message: `Thanks for the message ${name}` })

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async allMessages(req:Request, res:Response, next: NextFunction){
        try{
            const messages = await prisma.message.findMany({ orderBy:{ createdAt: 'desc' } })
            if(!messages){
                res.status(StatusCodes.OK).json({ message: 'No messages in the box' })
            }

            res.status(StatusCodes.OK).json({ data: messages })

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }
}