import {Request, Response} from "express";
import {videos} from "./db";

export type VideosType = {
    id: number
    title: string
    author: string
}

export const videosRepository = {
    async getVideos(): Promise<VideosType[]> {
        return videos
    },
    async getVideoById(id:number): Promise<VideosType | null> {
        const video = videos.find(v => v.id === id)
        if (video) {
            return video
        } else {
            return null
        }
    },
    async deleteVideoById(id: number): Promise<VideosType | boolean> {
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id === id) {
                videos.splice(i,1)
                return true
            }
        }
        return false
    },
    async updateVideoById(id: number, title: string): Promise <boolean> {
        const video = videos.find(v => v.id === id)
        if (video) {
            video.title = title;
            return true
            // return video
        } else {
            return false
        }
    },
    async createVideo(title: string): Promise<VideosType | boolean> {
        const newVideo = {
            id: +(new Date()),
            title: title,
            author: 'it-incubator'
        }
        videos.push(newVideo)
            return newVideo
    }
}

// app.get('/', (req:Request, res: Response) => {
//     res.send('Hello')
// })
// app.get('/videos', (req:Request, res:Response) => {
//     res.send(videos)
//     res.status(200)
// })
// app.get('/videos/:videoId', (req: Request, res: Response) => {
//     const id = +req.params.videoId;
//     const video = videos.find(v => v.id === id)
//     if (video) {
//         res.send(video)
//     } else {
//         res.sendStatus(404)
//     }
// })
// app.post('/videos', (req: Request, res: Response) => {
//     const title = req.body.title
//     if (!title || typeof title !== 'string' || !title.trim() || title.length > 40) {
//         res.status(400).send({
//             errorsMessages: [{
//                 message: "Incorrect title",
//                 field: "title"
//             }],
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
//                 field: "title"
//             }],
//         })
//         return;
//     }
//     const id = +req.params.videoId
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