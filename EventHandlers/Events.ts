import { SocketAddress } from "net"

interface room {
    files: {},
    admin: string,
    usersCanEdit: boolean
}

const AddEvents = (io) => {

    const rooms = {} 

io.on("connection", (socket) => {
    socket._rooms = []

    socket.on("update-text", (text, room) => {
        socket.to(room).emit("text-changed", text)
    })

    socket.on("join-room", (code) => {
        if (!code) return 
        socket.join(code)
        socket._rooms.push(code)
        console.log(`Socket: ${socket.id} joined ${code}`)
        socket.emit("room-joined", code, false)
    })

    socket.on("create-room", () => {
        const code = Math.floor(Math.random() * 100).toString()
        socket.join(code)
        socket._rooms.push(code)
        console.log(`Socket: ${socket.id} created ${code}`)
        rooms[code] =  {files: [], admin: socket.id, usersCanEdit: false}
        socket.emit("room-joined", code, true)
    })

    socket.on("canvas-edited", (x1,y1,x2,y2, room) => {
        socket.to(room).emit("canvas-update", x1,y1,x2,y2)
    })

    socket.on("canvas-image-edited", (blob, room) => {
        socket.to(room).emit("canvas-image-update", blob)
    })

    socket.on("file-upload", (file, room) => {
        socket.to(room).emit("files-uploaded", file)
    })

    socket.on("disconnect", () => {
        for (let room of socket._rooms) {
            if (rooms[room].admin == socket.id) {
                console.log(`Admin has left ${room}`)
                socket.to(room).emit("room-closed")
                rooms[room] = null
            }
        }
    })

    socket.on("canvas-cleared", (room:string) => {
        if (socket.id === rooms[room].admin) {
            socket.to(room).emit("canvas-cleared")
        }
    } )
})

}

module.exports = AddEvents