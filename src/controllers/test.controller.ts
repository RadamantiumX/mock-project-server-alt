import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { PornHub } from 'pornhub.js';

export class TestController{
    async phubApi(req: Request, res: Response, next:NextFunction){
        // const page:number = req.params
        const pornhub = new PornHub()
        const models = await pornhub.pornstarList({
            page: 1,
            gender: 'female',
            order: 'Most Popular'
        })
        
        res.status(StatusCodes.OK).json({ models: models })
    }
}

// Repo PornHub JS: https://github.com/pionxzh/Pornhub.js/tree/master