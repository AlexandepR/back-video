import express, {NextFunction, Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./route/videos-routes";
import * as net from "net";
import {ipMiddleware} from "./middleware/ipMiddleware";
import {videosRepository} from "./repositories/videos-repository";
import {counterMiddleware} from "./middleware/counterMiddleware";
// import requestIp from 'request-ip'

// app.set('trust proxy', true)


const app = express()
app.use(counterMiddleware)
app.use(ipMiddleware)
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000

app.use('/videos', videosRouter)


// var connect = require('connect');
// var http = require('http');
// var app = connect();
// app.use(function (req: Request, res: Response) {
//     const ip = req.myCustomAttributeName;
//     var ipType = net.isIP(ip)
//     res.end('Hello, your ip address is ' + ip + ' and is of type IPv' + ipType + '\n')
// })
// app.use('/video')
// const requestIp = require('request-ip')
// app.use(requestIp.mw( {attributeName : 'myCustomAttributeName'}))
//
// videosRouter.get('',ipMiddleware, (req: Request, res: Response) => {
//     const videos = videosRepository.getVideos()
//     const ip = req.myCustomAttributeName;
//     var ipType = net.isIP(ip)
//     res.end('Hello, your ip address is ' + ip + ' and is of type IPv' + ipType + '\n')
// })






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})