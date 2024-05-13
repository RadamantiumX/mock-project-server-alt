import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
import { validateUserSchema } from "../schemas/validations";


export class AuthController {
    
       async signin (req: Request, res: Response, next:NextFunction) {
             const { email, password } = req.body

             try{

                if (!email || !password) {
                return next({
                    status: StatusCodes.BAD_REQUEST,
                    message: 'Some required files are missing'
                })
             }

             const user = await prisma.user.findUnique({ where: {email} })

             if (!user){
                return next({
                    status: StatusCodes.NOT_FOUND,
                    message: 'User not found'
                })
             }

             const isValidPassword = await bcrypt.compare(password, user.password)

             if (!isValidPassword){
                return next({
                    status: StatusCodes.UNAUTHORIZED,
                    message: 'Invalid password or email provided',
                  });
             }
     
              const token = jwt.sign({ id: user.id, email: user.email });
             
              // Cookie options
              const cookieOptions = {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
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
           const { nickname, email, password, confirmPassword } = req.body
           try{
           const uniqueUser  = await prisma.user.findUnique({ where: { email } })
           const validate = validateUserSchema(req.body)
           if (uniqueUser) {
              res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists" })
           }

           if (!validate.success) {
              return next({
                status: StatusCodes.BAD_REQUEST,
                message: JSON.parse(validate.error.message)
              })
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
                 message: 'Something was wrong!'
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
               res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Not valid user' })
             }

         res.status(StatusCodes.OK).json({ message: `Welcome ${verifyUser?.nickname}!` })
      }catch(err){
         res.status(StatusCodes.UNAUTHORIZED).json({ message: "You must sign in first" })
      }       
  
   
    }

    async recovery(req: Request, res: Response, next:NextFunction){
           
    }
    async reset(req: Request, res: Response, next:NextFunction){
      
    }

    async logout(req: Request, res: Response, next:NextFunction){
        res.clearCookie('jwt') // Delete Cookie Session
        return res.json({ message: 'logout' })
    }
}

