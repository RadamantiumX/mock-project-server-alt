import bcrypt from "bcryptjs"
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma-db/prisma";
import jwt from "../utils/jwt";
import { validateUserSchema } from "../schemas/validations";

export class AuthController {
    
       async signin (req: Request, res: Response, next:NextFunction) {
             const { email, password } = req.body
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
            
              res.status(StatusCodes.OK).json({ response:{ id: user.id, nickname: user.nickname, email: user.email, token: token } });
    }

    async signup (req: Request, res: Response, next:NextFunction) {
           const { nickname, email, password, confirmPassword } = req.body
           const uniqueUser  = await prisma.user.findUnique({ where: { email } })
           const validate = validateUserSchema(req.body)
           if (uniqueUser) {
              return next({
                status: StatusCodes.BAD_REQUEST,
                message: 'Current email provided already exists'
              })
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

    }
}

