import {NextFunction, Request, Response} from "express";

export let counter = 0

export const counterMiddleware = (req:Request, res: Response, next: NextFunction) => {
    ++counter
    console.log(counter)
    res.header( 'count', counter.toString())
    next ()
}