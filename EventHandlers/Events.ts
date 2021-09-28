const AddEvents = (io) => {

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

    socket.on("canvas-edited", (x,y, room) => console.log(x,y, `Room: ${room}`))
})

}

module.exports = AddEvents