import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import jwt from "../utils/jwt";
import { prisma } from "../prisma-db/prisma";

export class SocialController{
    async fav(req:Request, res:Response, next: NextFunction){
        const { token, videoId } = req.body
        
        if (token){
            const decode:any = jwt.verify(token)
            const email = decode.email
            const id = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not auth' })
            }

        const addFav = await prisma.favorites.create({
            data: {
                videoId: videoId,
                authorId: id,
            }
        })
        res.status(StatusCodes.OK).json({ message: 'Adding to Favorites' })
            
  } else {
     res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not Authenticated" })
  }
    }

    async deleteFav(req:Request, res:Response, next: NextFunction){
        const { videoId, token } = req.body
        const deleteCurrentFav = await prisma.favorites.delete({ where:{ videoId } })
        res.status(StatusCodes.OK).json({ message: "Delete from Favorites" })
    }

    async isFav(req:Request, res:Response, next: NextFunction){
        const { token, videoId } = req.body
        if (token){
            const decode:any = jwt.verify(token)
            const email = decode.email
            const id = decode.id
            const verifyUser = await prisma.user.findUnique({ where:{email} })
            if (!verifyUser){
              res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not auth' })
            }

        const addFav = await prisma.favorites.findFirst({ where:{videoId} })
        if(!addFav){
          return next({
            status: StatusCodes.BAD_REQUEST,
            message: "Movie not Found"
          })
        }

        res.status(StatusCodes.OK).json({ message: "red" })
        
            
  } else {
     res.status(StatusCodes.UNAUTHORIZED).json({ message: "Not token provided" })
  }

    }
}