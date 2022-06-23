import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from "body-parser";
import {videosRouter} from "./route/videos-routes";
import requestIp from 'request-ip'

app.set('trust proxy', true)
const app = express()
app.use(cors())
app.use(bodyParser.json())
const port = process.env.PORT || 5000

app.use('/videos', videosRouter)

app.use(requestIp.mw())
app.use((req,res) => {
    const ip = req.clientIp
})


// app.use(requestIp.mw)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})