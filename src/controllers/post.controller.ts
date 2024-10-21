import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";
import { validatePostSchema } from '../schemas/validations';
import { verifyRecaptcha } from '../helpers/verifyRecaptcha';

export class PostController {
  async post(req:Request, res:Response, next: NextFunction){
  
    try{
      const {token, content, videoId} = req.body
        
      const decode:any = jwt.verify(token)
      const email = decode.email
      const authorId = decode.id
      const verifyUser = await prisma.user.findUnique({ where:{email} })
      const validatePost = validatePostSchema(content)
      if (!verifyUser){
        
        return next({
          status: StatusCodes.UNAUTHORIZED,
          message: 'Not authorized user'
        })
      }
      if (!validatePost.success) {
       console.log(validatePost.error.message)
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
     /* return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something's wrong"
    })*/
    console.error('Something was wrong')
    console.error(error)
    }
  }


   async postResponse(req:Request, res:Response, next: NextFunction){
      
      try{
            const { token, content, postId} = req.body

            const decode:any = jwt.verify(token)
            const email = decode.email
            const authorId = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
           // const validatePost = validatePostSchema(content)
            if (!verifyUser){
              
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized user'
              })
            }
           /* if (!validatePost.success) {
              res.status(StatusCodes.BAD_REQUEST).json(validatePost.error)
           }*/
         
              const addResponse = await prisma.responsePost.create({
                data: {
                    content: content,
                    authorId: authorId,
                    postId: postId,
                    nickname: verifyUser.nickname
                }
              })

              res.status(StatusCodes.OK).json({ message: 'Response sent successfully' })
             
      }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
      }
   }

  async responseResponsePost (req:Request, res:Response, next: NextFunction){
    
    try{
      const {token, content, responseId} = req.body

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
      const addResponseResponse = await prisma.responsePost.create({
        data: {
            content: content,
            authorId: authorId,
            nickname: verifyUser.nickname,
            responseId: responseId
        }
      })
      res.status(StatusCodes.OK).json({ message: 'Response sent successfully' })
      
    }catch(error){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: "Something's wrong"
    })
    }
  } 

   async countPosts(req:Request, res:Response, next: NextFunction){
      const id = req.params.id
      try{
        const countPost = await prisma.post.count({ where: { videoId: id } })
        if(!countPost){
          res.status(StatusCodes.OK).json({ count: 0 })
        }
        res.status(StatusCodes.OK).json({ count: countPost })
      }catch(error:any){
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: error.message
      })
      }
   }

   async countPostResponses(req:Request, res:Response, next: NextFunction){
    const id = req.params.id
    try{
      const countResponses = await prisma.responsePost.count({ where: { postId: parseInt(id) } })
      if(!countResponses){
        res.status(StatusCodes.OK).json({ count: 0 })
      }
      res.status(StatusCodes.OK).json({ count: countResponses })
    }catch(error:any){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: error.message
    })
    }
   }

   async countResponseResponses(req:Request, res:Response, next: NextFunction){
    const id = req.params.id
    try{
      const countResponseResponses = await prisma.responsePost.count({ where: { responseId: parseInt(id) } })
      if(!countResponseResponses){
        res.status(StatusCodes.OK).json({ count: 0 })
      }
      res.status(StatusCodes.OK).json({ count: countResponseResponses })
    }catch(error:any){
      return next({
        status: StatusCodes.BAD_REQUEST,
        message: error.message
    })
    }
   }

   async allPosts(req:Request, res:Response, next: NextFunction){
       const id  = req.params.id
       

       try{
       
         const count = await prisma.post.count({ where: { videoId: id } })
         const posts = await prisma.post.findMany({ where: { videoId: id }, orderBy:{ createdAt: 'desc' }  })
         
         if(!posts){
            res.status(StatusCodes.OK).json({ empty: false })
         }
         
         res.status(StatusCodes.OK).json({ count, posts })
         
         
         
       }catch(error:any){
           return next({
               status: StatusCodes.BAD_REQUEST,
               message: error.message
           })
       }
   }
async allResponsesPost(req:Request, res:Response, next: NextFunction){
  const id = req.params.id
    try{
          const count = await prisma.responsePost.count({ where:{postId: parseInt(id)} })
          const responses = await prisma.responsePost.findMany({ where:{postId: parseInt(id)},orderBy: {createdAt: 'desc'} })
          if(!responses){
            res.status(StatusCodes.OK).json({ empty: false })
          }

          res.status(StatusCodes.OK).json({ count, responses })
    }catch(error:any){
         return next({
          status: StatusCodes.BAD_REQUEST,
          message: error.message
         })
    }
}

async allResponsesResponse(req:Request, res:Response, next: NextFunction){
  const id = req.params.id
  try{
        const count = await prisma.responsePost.count({ where:{responseId: parseInt(id)} })
        const responses = await prisma.responsePost.findMany({ where:{responseId: parseInt(id)},orderBy: {createdAt: 'desc'} })
        if(!responses){
          res.status(StatusCodes.OK).json({ empty: false })
        }

        res.status(StatusCodes.OK).json({ count, responses })
  }catch(error:any){
       return next({
        status: StatusCodes.BAD_REQUEST,
        message: error.message
       })
  }
     
 }

 async destroyPost(req:Request, res:Response, next: NextFunction){
       const {id, token, path}= req.body
       try{
        const decode:any = jwt.verify(token)
        const email = decode.email
        const verifyUser = await prisma.user.findUnique({ where:{email} })   
        if (!verifyUser){    
          res.status(StatusCodes.UNAUTHORIZED).json({message:'Not authorized'})
         }
        if (path === 'post'){
          const deletePost = await prisma.post.delete({ where: {id: id} })

          res.status(StatusCodes.OK).json({ message: 'Post deleted' })
        } 
        const deleteResponse = await prisma.responsePost.delete({ where: {id: id} })
        res.status(StatusCodes.OK).json({message: 'Response deleted'})
        
       }catch(error:any){
        return next({
          status: StatusCodes.BAD_REQUEST,
          message: error.message
         })
       }
 }

}

