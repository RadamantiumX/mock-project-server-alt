//import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
// import { validateUserSchema } from "../schemas/validations"

export class UserController {
    async getUserInfo (req: Request, res: Response, next:NextFunction){
        
        try{
             const {token} = req.body
             const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
              return next({
                 status: StatusCodes.UNAUTHORIZED,
                 message: 'Not Authorized'
              })
             }

             res.status(StatusCodes.OK).json({nickname: verifyUser?.nickname, email: verifyUser?.email})

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something was wrong!'
             })
        }
    }

    async updateUserInfo (req: Request, res: Response, next:NextFunction) {
        try{
            const {payload, field, token} = req.body
            const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
              return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something was wrong!'
             }) 
             }
          if(field.includes('nickname')){
            const updateNickname = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    nickname: payload
                }
            })
            res.status(StatusCodes.OK).json({ message: 'The nickname was updated!' })
          }else{
             const updateEmail = await prisma.user.update({
                where: {
                    email: email
                },
                data: {
                    email: payload
                }
             })
             res.status(StatusCodes.OK).json({ message: 'The email was updated... You must Sign In again...' }).clearCookie('jwt')
          }
             

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something was wrong!'
             }) 
        }
    }

    async deleteUser(req: Request, res: Response, next:NextFunction){
        try{
            const {id} = req.body
            const deleteCurrentUser = await prisma.user.delete({ where:{id: id} })
            res.status(StatusCodes.OK).json({ message: 'User deleted...' })

        }catch(error){
            return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something was wrong!'
             }) 
        }
    }
}