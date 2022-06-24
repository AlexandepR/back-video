import {NextFunction, Request, Response} from "express";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // const auth = {login: 'admin', password: 'qwerty'};
    // if (req.headers['Authorization'] ) {
    //
    // }

    if (req.query.token === '123') {
        next()
    } else {
        res.sendStatus(401)
    }


    // const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    // const [login, password] = Buffer.from(b64auth,'base64').toString().split(' ');
    //
    // if (login && password && login === auth.login && password === auth.password) {
    //     return next()
    // }
    // res.set('WWW-Authenticate', 'Basic realm="401"');
    // res.status(401).send('Authentication required')
    next()
}

export default authMiddleware;