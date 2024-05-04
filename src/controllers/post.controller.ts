import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class PostController {
   async post(req:Request, res:Response, next: NextFunction){
      const { token, content, videoId, postId, response } = req.body
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
            if (response){
              const addResponse = await prisma.responsePost.create({
                data: {
                    content: content,
                    authorId: authorId,
                    postId: postId,
                    nickname: verifyUser.nickname
                }
              })

              res.status(StatusCodes.OK).json({ message: 'Response sent successfully' })
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
       const id  = req.params.id
       const type = req.params.type

       try{
        if (type === 'post'){
         const count = await prisma.post.count({ where: { videoId: id} })
         const posts = await prisma.post.findMany({ where: { videoId: id }, orderBy:{ createdAt: 'desc' }  })
         
         if(!posts){
            res.status(StatusCodes.OK).json({ message: 'No messages for this video' })
         }
         
         res.status(StatusCodes.OK).json({ count, posts })
         } 
         
         if(type === 'reply'){
            const count = await prisma.responsePost.count({ where: { postId: parseInt(id) } })
            const reply = await prisma.responsePost.findMany({ where: { postId: parseInt(id) }, orderBy: { createdAt: 'desc' } })

            if(!reply){
              res.status(StatusCodes.OK).json({ message: 'Not found responses' })
            }

            res.status(StatusCodes.OK).json({ count, reply })
         }
       }catch(error:any){
           return next({
               status: StatusCodes.BAD_REQUEST,
               message: error.message
           })
       }
   }
async allResponses(req:Request, res:Response, next: NextFunction){
    try{
          const responses = await prisma.responsePost.findMany({ orderBy: {createdAt: 'desc'} })
          if(!responses){
            res.status(StatusCodes.OK).json({ message: "No responses" })
          }

          res.status(StatusCodes.OK).json({ responses })
    }catch(error:any){
         return next({
          status: StatusCodes.BAD_REQUEST,
          message: error.message
         })
    }
}

async reply(req:Request, res:Response, next: NextFunction){
  const { token, content, videoId, postId, response } = req.body
     
 }

}

