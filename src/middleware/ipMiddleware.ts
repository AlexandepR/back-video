import {NextFunction, Request, Response} from "express";
import {blackListIp} from "../repositories/db";


const requestIp = require('request-ip')

export const ipMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    const findIp = blackListIp.find(blackIp => blackIp.ip === ip)
    if (findIp) {
        res.sendStatus(403)
        return
    }

    next();
}
