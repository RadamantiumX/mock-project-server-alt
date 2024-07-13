import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
import { validateUserSchema } from "../schemas/validations"

export class UserController {
    async getUserInfo (req: Request, res: Response, next:NextFunction){
        const {token} = req.body
        try{
             const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
              return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not valid user' })
             }

             res.status(StatusCodes.OK).json({nickname: verifyUser?.nickname, email: verifyUser?.email})

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: JSON.parse('Something was wrong!')
             })
        }
    }

    async updateUserInfo (req: Request, res: Response, next:NextFunction) {
        const {newEmail, newNickname, token} = req.body
        try{
            const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
              return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not valid user' })
             }

             

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: JSON.parse('Something was wrong!')
             }) 
        }
    }
}