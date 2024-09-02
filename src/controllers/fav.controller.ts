import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

type Body = {
  token: string,
  videoId: string
 }
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
           res.status(StatusCodes.OK).json({ fill: 'red',button:'Favorite',message: 'Adding to favorites', id: addFav.id})
          }catch(err){
          return  res.status(StatusCodes.FORBIDDEN).json({ message: "Not Authorized" })
            
          }        
 
    }
   
    async deleteFav(req:Request, res:Response, next: NextFunction){
        const { token, videoId }:Body = req.body
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
          
          
          res.status(StatusCodes.OK).json({ fill:'none',button:"Add to Favorites",message: "Delete from favorites" })
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
          res.status(StatusCodes.ACCEPTED).json({ fill: 'none', button: 'Add to Favorites' })
        }

        res.status(StatusCodes.OK).json({ fill: "red", button: "Favorite", id: addFav?.id })
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
          const results:any[] = []
          const timestamp:any[] = []
          const userVideoFav = await prisma.favorite.findMany({ where: {authorId:authorId} })
          userVideoFav.map((e)=>{ results.push(e.videoId); timestamp.push(e.createdAt) })
          res.status(StatusCodes.OK).json({ results: results, timestamp: timestamp })
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