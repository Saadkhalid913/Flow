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


io.on("connection", (socket) => {
    socket.on("update-text", (text) => {
        console.log("text changed")
        socket.broadcast.emit("text-changed", text)
    })
})



server.listen(4001, () => console.log("Listening on port #4001"))