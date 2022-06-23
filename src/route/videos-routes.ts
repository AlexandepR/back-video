import {Request, Response, Router} from 'express';
import {videos} from "../repositories/db";
import {videosRepository} from "../repositories/videos-repository";
import {body} from "express-validator";
import {middleware} from "../middleware/middleware";
import net from "net";
import {ipMiddleware} from "../middleware/ipMiddleware";

export const videosRouter = Router({})

export const titleValidation = body('title')
    .isLength({min: 0, max: 40}).isString().trim().withMessage('Title invalid')





videosRouter.get('', (req: Request, res: Response) => {
    const videos = videosRepository.getVideos()
    if (videos) {
        res.status(200).send(videos)
        res.send(req.ip)
    } else {
        res.sendStatus(400)
    }
})



videosRouter.get('/:id', (req: Request, res: Response) => {
    // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // res.send(ip)

    const video = videosRepository.getVideoById(+req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }
})

videosRouter.post('/', titleValidation,middleware, (req: Request, res: Response) => {
    const newVideo = videosRepository.createVideo(req.body.title)
    if (!newVideo) {
        res.status(400).send(
            {
                errorsMessages: [{
                    message: "Incorrect title",
                    field: "title"
                }],
            }
        )
    } else {
        res.status(201).send(newVideo)
    }
})

videosRouter.put('/:id', titleValidation, middleware, (req: Request, res: Response) => {
    const video = videosRepository.updateVideoById(+req.params.id,req.body.title)
    if (!video) {
        res.status(400).send({
            errorsMessages: [{
                message: "Incorrect title",
                field: "title"
            }],
        })
        return;
    } else {
        res.status(204).send(video)
    }
})

videosRouter.delete('/id', (req:Request, res:Response) => {
    const isDeleted = videosRepository.deleteVideoById(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})