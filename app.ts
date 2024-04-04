import express, {json} from 'express'
import router from './src/router/auth.router'
import 'dotenv/config'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config()
export const createApp = () => {
    
    const app = express()
    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true  }))
    app.use(bodyParser.json())
    
    // app.disable('x-powered-by')

    app.use('/auth', router)

    const PORT = process.env.PORT || 3000

    app.listen(PORT, () => {
        console.log(`server listening on port:  http://localhost:${PORT}`)
    })
}

