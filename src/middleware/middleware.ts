import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

let blackListIp = [{id:1,ip: '94.43.162.216'}]

export let middleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    let errorsMessages = errors.array({onlyFirstError:true}).map(err => ({
        message: err.msg,
        field: err.param
    }))
    if (!errors.isEmpty()) {
        res.status(400)
        res.send({
            errorsMessages
        })
        return
    } else {
        next()
    }

        // if( blackListIp.find( blackIp => req.ip === blackIp.ip)) {
        //     return false
        // }

}