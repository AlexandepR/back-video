import {NextFunction, Request, Response} from "express";



export const contentTypeMiddleware = (contentType: string) => (
    req: Request, res: Response, next: NextFunction) => {

    const content = req.headers['content-type']
    if (content !== contentType) {
    // if (content !== "application/json") {
        res.status(400).send('Bad content type')
        return
    }
    next()
}