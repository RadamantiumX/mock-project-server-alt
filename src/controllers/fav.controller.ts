import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class FavController{
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
          const deleteCurrent = await prisma.$executeRaw`DELETE FROM favorite WHERE (videoId = ${videoId}) AND (authorId = ${parseInt(authorId)});`
          
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

        const addFav = await prisma.favorite.findFirst({ where: { videoId: videoId, authorId: authorId } })
        if(!addFav){
          res.status(StatusCodes.NO_CONTENT).json({ message: 'none' })
        }

        res.status(StatusCodes.OK).json({ message: "red" })
        }catch(err){
          return next({
            status: StatusCodes.FORBIDDEN,
            message: 'User not authorized'
         })
        }
        

    }

    async favVideos(req:Request, res:Response, next: NextFunction){
      const {token} = req.body
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
          const results:string[] = []
          const userVideoFav = await prisma.favorite.findMany({ where: {authorId:authorId} })
          userVideoFav.map((e)=>{ results.push(e.videoId) })
          res.status(StatusCodes.OK).json({ results: results })
        }catch(error:any){
          return console.error(`Bad Request ${error.message}`)
        }
    }



    async isTest(req:Request, res:Response, next: NextFunction){
       const {authorId, videoId } = req.body
      try{
         const fav = await prisma.favorite.findFirst({ where: { videoId: videoId, authorId:authorId } })
         if(!fav) res.status(StatusCodes.NO_CONTENT).json({ message: 'No content' })// return next({ status: StatusCodes.BAD_REQUEST, message: 'Not results' })
         res.status(StatusCodes.OK).json({ fav })
      } catch(err){
        
       return next({
          status: StatusCodes.BAD_REQUEST,
          message: 'Not results found'
       })
      
        
      } 
     //const fav:any = await prisma.$queryRaw`SELECT * FROM favorite WHERE videoId = ${videoId} AND authorId = ${authorId};`
     
      
          
        
    }
}