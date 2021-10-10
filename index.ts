declare function require(path: string): any

import * as express from "express"
import { createServer } from "http"
import ViewRouter from "./routes"
import * as config from "config"

const app = require("express")()
const server = createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    },
    maxHttpBufferSize: config.get("MaxBufferSize"),
});

console.log(config.get("MaxBufferSize"))
// adding event listeners 
require("./EventHandlers/Events")(io)
app.use("/", ViewRouter)


server.listen(4000, () => console.log("Listening on port #4000"))