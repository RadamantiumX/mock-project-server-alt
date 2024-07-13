import express, {json} from 'express'
import authRouter from './src/router/auth.router'
import favRouter from './src/router/fav.router'
import postRouter from './src/router/post.router'
import likeRouter from './src/router/like.router'
import messageRouter from './src/router/message.router'
import userRouter from './src/router/user.router'
import testRouter from './src/router/test.router'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()
export const createApp = () => {
    
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true  }))
    app.use(bodyParser.json())
    app.use(cookieParser())
    
    // app.disable('x-powered-by')
    app.get('/',(req, res)=>{
        res.status(200).json({message: "Server On!"})
    })
    app.use('/auth', authRouter)
    app.use('/social', favRouter)
    app.use('/post', postRouter)
    app.use('/like', likeRouter)
    app.use('/message', messageRouter)
    app.use('/phub', testRouter)
    app.use('/user', userRouter)
    

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`server listening on port:  http://localhost:${PORT}`)
    })
}

