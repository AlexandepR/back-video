// import express from 'express'
// import cors from 'cors'
// import bodyParser from "body-parser";

const express = require('express')
const app = express()
// const corsMiddleware = cors();
// app.use(corsMiddleware)
// const jsonBodyMiddleware = bodyParser.json()
// app.use(jsonBodyMiddleware)
// const port = process.env.PORT || 5000
const port = 5000

let videos = [
    {id: 1, title: 'About JS - 01', author: 'it-incubator.eu'},
    {id: 2, title: 'About JS - 02', author: 'it-incubator.eu'},
    {id: 3, title: 'About JS - 03', author: 'it-incubator.eu'},
    {id: 4, title: 'About JS - 04', author: 'it-incubator.eu'},
    {id: 5, title: 'About JS - 05', author: 'it-incubator.eu'},
]
app.get('/', (req, res) => {
    res.send('Hello world!!!')
    // res.json(videos)
})
// app.post('/videos', (req: Request, res: Response) => {
//     let title = req.body.title
//     if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
//         res.status(400).send({
//             errorsMessages: [{
//                 "message": "Incorrect title",
//                 "field": "title",
//             }],
//             resultCode: '1'
//         })
//         return;
//     }
//     const newVideo = {
//         id: +(new Date()),
//         title: title,
//         author: 'it-incubator'
//     }
//     videos.push(newVideo)
//     res.status(201).send(newVideo)
// })
// app.put('/videos/:videoId', (req: Request, res: Response) => {
//     let title = req.body.title
//     if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: "Incorrect title",
//                 field: "title",
//             }],
//             resultCode: '1'
//         })
//         return;
//     }
//     const id = +req.params.id
//     const video = videos.find(v => v.id === id)
//     if (video) {
//         video.title = title;
//         res.status(204).send(video)
//     } else {
//         res.send(404)
//     }
// })
// app.delete('/videos/:videoId', (req: Request, res: Response) => {
//     const id = +req.params.videoId
//     const newVideos = videos.filter(v => v.id !== id)
//     if (newVideos.length < videos.length) {
//         videos = newVideos
//         res.send(204)
//     } else {
//         res.send(404)
//     }
// })
// app.get('videos/:videoId', (req: Request, res: Response) => {
//     const id = +req.params.videoId;
//     const video = videos.find(v => v.id === id)
//     if (!video) {
//         res.sendStatus(404)
//     } else {
//         res.json(video)
//     }
// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})