import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
import { validateUserSchema, validatePasswordSchema } from "../schemas/validations";
import { main } from '../utils/mail'
import { verifyRecaptcha } from '../helpers/verifyRecaptcha'

export class AuthController {
    
       async signin (req: Request, res: Response, next:NextFunction) {
             const { email, password, recaptcha } = req.body

             try{
                if(!recaptcha){
                  return next({
                     status: StatusCodes.BAD_REQUEST,
                     message: 'No token provided'
                 })
                }
                if (!email || !password) {
                return next({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Some required files are missing'
                })
               }
             const verifyResults = await verifyRecaptcha(recaptcha)
             if (!verifyResults.success){
               return next({
                  status: StatusCodes.BAD_REQUEST,
                  message: 'Some required files are missing'
              })
             }
             const user = await prisma.user.findUnique({ where: {email} })

             if (!user){
                return res.status(StatusCodes.BAD_REQUEST).json({ message: 'The email, or password, provided is wrong.' })
             }

             const isValidPassword = await bcrypt.compare(password, user.password)

             if (!isValidPassword){
               return res.status(StatusCodes.BAD_REQUEST).json({ message: 'The email, or password, provided is wrong.' })
             }
     
              const token = jwt.sign({ id: user.id, email: user.email });
             
              // Cookie options
              const cookieOptions = {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),// 7 days
                    httpOnly: true
              }
              res.cookie('jwt', token, cookieOptions) // Cookie Session -> Server side 
              
              res.status(StatusCodes.OK).json({ response:{ id: user.id, nickname: user.nickname, email: user.email, token: token } });

             }catch(err){
                 return next({
                  status: StatusCodes.BAD_REQUEST,
                  message: 'Something was wrong!'
                 })
             }
            
    }

    async signup (req: Request, res: Response, next:NextFunction) {
           
           try{
           const { nickname, email, password, confirmPassword,recaptcha } = req.body
           if(!recaptcha){
            return next({
               status: StatusCodes.BAD_REQUEST,
               message: 'No token provided'
           })
          }
          const verifyResults = await verifyRecaptcha(recaptcha)
             if (!verifyResults.success){
               return next({
                  status: StatusCodes.BAD_REQUEST,
                  message: 'Some required files are missing'
              })
             }
           const uniqueUserEmail  = await prisma.user.findUnique({ where: { email } })
           const uniqueUserNickname = await prisma.user.findUnique({ where:{ nickname } })
           const validate = validateUserSchema(req.body)
           if (uniqueUserEmail) {
            return  res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists" })
           }
           if (uniqueUserNickname){
             return res.status(StatusCodes.BAD_REQUEST).json({ message: "Nickname already taken" })
           }

           if (!validate.success)
            {           
                return res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validate.error.message)})
               /* return next({
                  status: 400,
                  message: JSON.parse(validate.error.message)
               })*/
           }

           const hashedPassword = bcrypt.hashSync(password, 10)

           const newUser = await prisma.user.create({
             data: {
                nickname: nickname,
                email: email,
                password: hashedPassword
               }
           })

           res.status(StatusCodes.OK).json({ message: "User register successfully" })

           }catch(err){
              return next({
                 status: StatusCodes.BAD_REQUEST,
                 message: 'Something went wrong!'
              })
           }
           

    }
    async isAuthenticated(req: Request, res: Response, next:NextFunction){
      const { token } = req.body
        
         try{
             const decode:any = jwt.verify(token)
             const email = decode.email
             const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
               return next({
                  status: StatusCodes.UNAUTHORIZED,
                  message: 'Not Authorized'
               })
             }

         res.status(StatusCodes.OK).json({ message: `Welcome ${verifyUser?.nickname}!` })
      }catch(err){
         return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Somenthing went wrong!'
         })
      }       
  
   
    }

    async recovery(req: Request, res: Response, next:NextFunction){
           try{
            const {email} = req.body
            const verifyEmail = await prisma.user.findUnique({where:{email}})
            if(!verifyEmail){
               return res.status(StatusCodes.BAD_REQUEST).json({message: "Email provided is not registered"})
            }
            const token = jwt.sign({id:verifyEmail.id, email:verifyEmail.email})
            const sendEmail = await main(email, token)
            res.status(StatusCodes.OK).json({ message: "We sent you a the password reset link to the email provided." })

           }catch(err){
            return next({
               status: StatusCodes.BAD_REQUEST,
               message: 'Somenthing went wrong!'
            })
           }
    }
    async reset(req: Request, res: Response, next:NextFunction){
      try{
         const {token, password, confirmPassword} = req.body
         const validateUserPassword = validatePasswordSchema({password, confirmPassword})
         if (!validateUserPassword.success){
             return res.status(StatusCodes.BAD_REQUEST).json({message: JSON.parse(validateUserPassword.error.message)})
         }
         const decode:any = jwt.verify(token)
         const email = decode.email
         const verifyUser = await prisma.user.findUnique({ where:{email} })
             if (!verifyUser){
               return next({
                  status: StatusCodes.UNAUTHORIZED,
                  message: 'Not Authorized'
               })
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

      }catch(err){
         return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Somenthing went wrong!'
         })
      }
    }

    async logout(req: Request, res: Response, next:NextFunction){
       try{
         /*const {reCaptcha} = req.body
         if(!reCaptcha){
            return next({
               status: StatusCodes.BAD_REQUEST,
               message: 'No token provided'
           })
          }
          const verifyResults = await verifyRecaptcha(reCaptcha)
             if (!verifyResults.success){
               return next({
                  status: StatusCodes.BAD_REQUEST,
                  message: 'Some required files are missing'
              })
             }*/
          res.clearCookie('jwt') // Delete Cookie Session
          return res.json({ message: 'logout' })
       }catch(err){
         return next({
            status: StatusCodes.BAD_REQUEST,
            message: 'Somenthing went wrong!'
         })
       }
        
    }
}

