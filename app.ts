import express, {json} from 'express'
import authRouter from './src/router/auth.router'
import socialRouter from './src/router/social.router'
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

    app.use('/auth', authRouter)
    app.use('/social', socialRouter)


    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`server listening on port:  http://localhost:${PORT}`)
    })
}

