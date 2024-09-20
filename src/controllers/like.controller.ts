import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class LikeController {
    async likeVideo(req:Request, res:Response, next: NextFunction){
        const { token, videoId, like } = req.body

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
            // Verify the record with this fields
            const verifyLike = await prisma.likeVideo.findFirst({ where: {videoId:videoId, authorId:authorId} })
            
            // If exists with this same fields, this record must be deleted
            if(verifyLike){
                const deleteCurrent = await prisma.likeVideo.delete({ where: {id: verifyLike.id}  })
            }
            // Then, the new record is created with a different "like" value
            const addlike = await prisma.likeVideo.create({
                data:{
                    videoId: videoId,
                    like: like,
                    authorId: authorId
                }
            })
            if (like){
               res.status(StatusCodes.OK).json({ message: 'You liked this video', id: addlike.id }) 
            }

            res.status(StatusCodes.OK).json({ message: 'Disliked this video', id: addlike.id }) 

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async deleteLikeVideo(req:Request, res:Response, next: NextFunction){
        const { token, id } = req.body
        try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            // const authorId = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized user'
              })
            }
             const deleteCurrent = await prisma.likeVideo.delete({ where: {id} })
            // const deleteCurrent = await prisma.$executeRaw`DELETE FROM likevideo WHERE (videoId = ${videoId}) AND (authorId = ${parseInt(authorId)});`
            
            res.status(StatusCodes.OK).json({ message: 'Deleted' })

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }
    async currentLikeVideo(req:Request, res:Response, next: NextFunction){
        const { token, videoId } = req.body
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

            const likedVideo = await prisma.likeVideo.findFirst({ where: { videoId: videoId, authorId: authorId } })
            
            if(!likedVideo){
                res.status(StatusCodes.OK).json({ message: 'none'})
            }
           
            res.status(StatusCodes.OK).json({ like: likedVideo?.like, id:likedVideo?.id })  
            

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async countLikes(req:Request, res:Response, next: NextFunction){
        
        try{
            const  id = req.params.id
            const table = req.params.table
            if(table === 'video'){
            const total = await prisma.likeVideo.count({ where: { videoId : id } })
            const totalLikes = await prisma.likeVideo.count({ where: { videoId: id, like: true } })
            if (!total){
                res.status(StatusCodes.OK).json({ total: 0, totalLikes: 0 })
            }

            res.status(StatusCodes.OK).json({ total: total, totalLikes: totalLikes })
            }else if (table === 'post'){
                const total = await prisma.likePost.count({ where: { postId : parseInt(id)} })
                const totalLikes = await prisma.likePost.count({ where: { postId: parseInt(id), like:true } })
                if (!total){
                    res.status(StatusCodes.OK).json({ total: 0, totalLikes: 0 })
                }
    
                res.status(StatusCodes.OK).json({ total: total, totalLikes: totalLikes })  
            }else{
                const total = await prisma.likeResponse.count({ where: { responseId : parseInt(id)} })
                const totalLikes = await prisma.likeResponse.count({ where: { responseId: parseInt(id), like:true } })
                if (!total){
                    res.status(StatusCodes.OK).json({ total: 0, totalLikes: 0 })
                }
    
                res.status(StatusCodes.OK).json({ total: total, totalLikes: totalLikes })  
            }
        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async likePost(req:Request, res:Response, next: NextFunction){
         const { token , id, like, table } = req.body
         try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            const authorId = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
                res.status(StatusCodes.UNAUTHORIZED).json({message: 'Not authorized'})
            }
            if(table === 'post'){
                const likePost = await prisma.likePost.create({
                    data:{
                        like:like,
                        postId: id,
                        authorId: authorId
                    }
                })
                res.status(StatusCodes.OK).json({message: 'You Liked this post'})
            }
                const likeResponse = await prisma.likeResponse.create({
                    data: {
                        like: like,
                        responseId: id,
                        authorId: authorId
                    }
                })
            res.status(StatusCodes.OK).json({message: 'You Liked this response'})


         }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
         }
    }

    async deleteLikePost(req:Request, res:Response, next: NextFunction){
        const {token, id, table} = req.body
        try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized user'
              })
            }
            if(table === 'post'){
            const deleteCurrentPost = await prisma.likePost.delete({ where: {id} })
            res.status(StatusCodes.OK).json({message: 'deleted'})
            }
            const deleteCurrentPost = await prisma.likeResponse.delete({ where: {id} })
            res.status(StatusCodes.OK).json({message: 'deleted'})
        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async currentLikePost(req:Request, res:Response, next: NextFunction){
        const {token, id} = req.body
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

              const likedVideo = await prisma.likePost.findFirst({ where: { postId: parseInt(id), authorId: authorId } })
              const countTotal = await prisma.likePost.count({ where: { postId: parseInt(id) } })
            
              if(!likedVideo){
                  res.status(StatusCodes.NOT_MODIFIED).json({ message: 'none'})
              }
            res.status(StatusCodes.OK).json({message: 'white', total: countTotal})

          
        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async currentLikeResponse(req:Request, res:Response, next: NextFunction){
        const {token, id} = req.body
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

              const likedVideo = await prisma.likeResponse.findFirst({ where: { responseId: id, authorId: authorId } })
              const countTotal = await prisma.likeResponse.count({ where: { responseId: id } })
            
              if(!likedVideo){
                  res.status(StatusCodes.NOT_MODIFIED).json({ message: 'none'})
              }
            res.status(StatusCodes.OK).json({message: 'white', total: countTotal})

          
        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async test(req:Request, res:Response, next: NextFunction){
        const { videoId, authorId } = req.body

        const likedVideo = await prisma.likeVideo.findFirst({ where: { videoId: videoId, authorId: authorId } })

        if(!likedVideo){
            res.status(StatusCodes.OK).json({ message: 'Not filled'})
        }

        const countLikes = await prisma.likeVideo.count({ where:{ videoId: videoId, like: true } })
        const countTotal = await prisma.likeVideo.count({ where: { videoId: videoId } })
        res.status(StatusCodes.OK).json({ like: likedVideo?.like, count_likes: countLikes, count_total: countTotal })
    }
}