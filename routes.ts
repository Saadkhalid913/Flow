import * as express from "express"
import * as path from "path"
const router = express.Router()

router.get("/", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/build/index.html"))
})

router.get("/:filename", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/build/", req.params.filename))
})

router.get("/static/js/:filename", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/build/static/js/", req.params.filename))
})

router.get("/static/css/:filename", (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, "/build/static/css/", req.params.filename))
})

export default router