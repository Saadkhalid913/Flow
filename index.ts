declare function require(path: string): any

import express from "express"
import { createServer } from "http"

const app = require("express")()
const server = createServer(app)
const io = require("socket.io")(server, {
    cors: {
        origin: "*"
    }
});

// adding event listeners 
require("./EventHandlers/Events")(io)



server.listen(4000, () => console.log("Listening on port #4000"))