import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class SocialController{
    async fav(req:Request, res:Response, next: NextFunction){
        const { token, videoId } = req.body
            
        try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            const id = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized user'
              })
            }

            const addFav = await prisma.favorite.create({
            data: {
                videoId: videoId,
                authorId: id,
            }
          })
           res.status(StatusCodes.OK).json({ message: 'Adding to Favorites'})
          }catch(err){
            res.status(StatusCodes.FORBIDDEN).json({ message: "Not Authorized" })
            
          }        
 
    }

    async deleteFav(req:Request, res:Response, next: NextFunction){
        const { videoId, token } = req.body
        try{
          const decode:any = jwt.verify(token)
          const email = decode.email
          const authorId = decode.id
          const verifyUser = await prisma.user.findUnique({ where: {email} })
          if(!verifyUser){
           
            return next({
              status: StatusCodes.UNAUTHORIZED,
              message: 'Not user authenticated'
            })
          }
          const deleteCurrent = await prisma.$queryRaw`DELETE FROM favorites WHERE (videoId = ${videoId}) AND (authorId = ${authorId});`
          
          res.status(StatusCodes.OK).json({ message: "Delete from Favorites" })
        }catch(err){
          return next({
            status: StatusCodes.FORBIDDEN,
            message: 'User not authorized'
         })
        }
       
    }

    async isFav(req:Request, res:Response, next: NextFunction){
        const { token, videoId } = req.body
        try{
            const decode:any = jwt.verify(token)
            const email = decode.email
            const authorId = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){  
              return next({
                status: StatusCodes.UNAUTHORIZED,
                message: 'Not authorized'
              })
            }

        const addFav = await prisma.$queryRaw`SELECT * FROM "public"."Favorites" WHERE (videoId = ${videoId}) AND (authorId = ${authorId});`
        if(!addFav){
          res.status(StatusCodes.OK).json({ message: 'none' })
        }

        res.status(StatusCodes.OK).json({ message: "red" })
        }catch(err){
          return next({
            status: StatusCodes.FORBIDDEN,
            message: 'User not authorized'
         })
        }
        

    }

    async isTest(req:Request, res:Response, next: NextFunction){
       const {authorId, videoId } = req.body
       // const addFav = await prisma.$queryRaw`SELECT * FROM favorites WHERE (videoId = ${videoId}) AND (authorId = ${authorId});`
      const addFav = await prisma.favorite.findFirst({ where: { authorId: authorId, videoId: videoId } })
       
       if(!addFav){
          return "red"
        }

        res.status(StatusCodes.OK).json({ message: "red" })
    }
}