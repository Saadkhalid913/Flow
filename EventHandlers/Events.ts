const AddEvents = (io) => {

    const rooms = new Map()

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
        socket.emit("room-joined", code, false)
    })

    socket.on("create-room", () => {
        const code = Math.floor(Math.random() * 100).toString()
        socket.join(code)
        console.log(`Socket: ${socket.id} created ${code}`)
        rooms.set(code, socket.id)
        socket.emit("room-joined", code, true)
    })

    socket.on("canvas-edited", (x1,y1,x2,y2, room) => {
        socket.to(room).emit("canvas-update", x1,y1,x2,y2)
    })

    socket.on("canvas-image-edited", (blob, room) => {
        socket.to(room).emit("canvas-image-update", blob)
    })

    socket.on("file-upload", (file, room) => {
        console.log(file)
    })
})

}

module.exports = AddEvents