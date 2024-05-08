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
               res.status(StatusCodes.OK).json({ message: 'You liked this video' }) 
            }

            res.status(StatusCodes.OK).json({ message: 'Disliked this video' }) 

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }

    async deleteLike(req:Request, res:Response, next: NextFunction){
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

            const deleteCurrent = await prisma.$executeRaw`DELETE FROM likevideo WHERE (videoId = ${videoId}) AND (authorId = ${parseInt(authorId)});`

            res.status(StatusCodes.OK).json({ message: 'Deleted' })

        }catch(err){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: "Something's wrong"
            })
        }
    }
    async currentLike(req:Request, res:Response, next: NextFunction){
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
                res.status(StatusCodes.NOT_MODIFIED).json({ message: 'none'})
            }
            
            
            res.status(StatusCodes.OK).json({ like: likedVideo?.like })  
            

        }catch(err){
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
        res.status(StatusCodes.OK).json({ likedVideo})
    }
}