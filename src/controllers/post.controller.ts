import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class PostController {
   async post(req:Request, res:Response, next: NextFunction){
      const { token, content, videoId } = req.body
      try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            const authorId = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized user'
              })
            }

            const addPost = await prisma.post.create({
                data:{
                    content: content,
                    authorId: authorId,
                    videoId: videoId,
                    nickname: verifyUser.nickname
                }
            })

            res.status(StatusCodes.OK).json({ message: 'Post sent successfully' })
      }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
      }
   }

   async allPosts(req:Request, res:Response, next: NextFunction){
       const videoId  = req.params.id

       try{
         const count = await prisma.post.count({ where: { videoId: videoId } })
         const posts = await prisma.post.findMany({ where: { videoId: videoId } })
         
         if(!posts){
            res.status(StatusCodes.OK).json({ message: 'No messages for this video' })
         }
         
         res.status(StatusCodes.OK).json({ count, posts })
       }catch(error){
           return next({
               status: StatusCodes.BAD_REQUEST,
               message: "Something's wrong"
           })
       }
   }
}