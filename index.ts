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
    socket.on("update-text", (text, room) => {
        console.log("text changed in room: " + room )
        console.log(text)
        socket.to(room).emit("text-changed", text)
    })

    socket.on("join-room", (code) => {
        if (!code) return 
        socket.join(code)
        console.log(`Socket: ${socket.id} joined ${code}`)
        socket.emit("room-joined", code)
    })

    socket.on("create-room", () => {
        const code = Math.floor(Math.random() * 100).toString()
        socket.join(code)
        console.log(`Socket: ${socket.id} joined ${code}`)
        socket.emit("room-joined", code)
    })
})



server.listen(4000, () => console.log("Listening on port #4000"))