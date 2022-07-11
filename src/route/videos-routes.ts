import {Request, Response, Router} from 'express';
import {videos} from "../repositories/db";
import {videosRepository} from "../repositories/videos-repository";
import {body, validationResult} from "express-validator";
import {middleware} from "../middleware/middleware";
import net from "net";
import {ipMiddleware} from "../middleware/ipMiddleware";
import {contentTypeMiddleware} from "../middleware/contentTypeMiddleware";
import authMiddleware from "../middleware/authMiddleware";

export const videosRouter = Router({})

export const titleValidation = body('title')
    .isLength({min: 5, max: 40}).withMessage('Max 40 symbols').isString().trim().withMessage('Title invalid')





videosRouter.get('',
    authMiddleware,
    body('name')
        .isLength({max: 15})
        .withMessage('Max 15 symbols')
        .matches(/^[\w ]*$/)
        .withMessage('Only letters/numbers - and whitespace'),
    async (req: Request, res: Response) => {

    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({ resultCode: 1, errors: errors.array() })
    // }

    const videos = await videosRepository.getVideos()
    if (videos) {
        res.status(200).send(videos)
        res.send(req.ip)
    } else {
        res.sendStatus(400)
    }
})



videosRouter.get('/:id', async (req: Request, res: Response) => {
    // let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
    // res.send(ip)

    const video = await videosRepository.getVideoById(+req.params.id)
    if (video) {
        res.status(200).send(video)
    } else {
        res.sendStatus(404)
    }
})

videosRouter.post('/',
    // contentTypeMiddleware,
    titleValidation,
    middleware,
    async (req: Request, res: Response) => {
    const newVideo = await videosRepository.createVideo(req.body.title)
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

videosRouter.put('/:id', titleValidation, middleware, async (req: Request, res: Response) => {
    const video = await videosRepository.updateVideoById(+req.params.id,req.body.title)
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

videosRouter.delete('/id', async (req:Request, res:Response) => {
    const isDeleted = await videosRepository.deleteVideoById(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})