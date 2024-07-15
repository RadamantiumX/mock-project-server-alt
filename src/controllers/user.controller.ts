//import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
import bcrypt from "bcryptjs"
import { validateEmail, validateNickname, validatePasswordSchema } from '../schemas/validations';

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
            const { field, token} = req.body
            const {payload} = req.body
            if (field === 'nickname'){
               const validateUserNickname = validateNickname(payload)
               if(!validateUserNickname.success){
                 return res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validateUserNickname.error.message)})
               } 
            }else{
               const validateUserEmail = validateEmail(payload)
               if(!validateUserEmail.success){
                 return res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validateUserEmail.error.message)})
               }
            }
            
            
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

    async updatedUserPassword(req: Request, res: Response, next:NextFunction){
         try{
            const{oldPassword, password, confirmPassword, token} = req.body
            const validateUserPassword = validatePasswordSchema({password, confirmPassword})
            if (!validateUserPassword.success){
                return res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validateUserPassword.error.message)})
            }

            const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
              return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Something was wrong!'
             }) 
             }
             const validPassword = await bcrypt.compare(oldPassword, verifyUser.password)
             if(!validPassword){
                return res.status(StatusCodes.BAD_REQUEST).json({message: "Old password is wrong!"})
             }
             const hashedPassword = bcrypt.hashSync(password, 10)
             const updatePassword = await prisma.user.update({
                where: {
                    email: email
                },
                data:{
                    password: hashedPassword
                }
             })

             res.status(StatusCodes.OK).json({ message: 'Password updated successfully!' })


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