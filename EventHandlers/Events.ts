interface room {
    files: {},
    admin: string,
    usersCanEdit: boolean
}

interface Chat {
    name: string,
    message: string,
    isOwn: boolean
}

const AddEvents = (io) => {


    const GenerateJoinCode = () : string => {
        let length = 6
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const rooms = {} 

io.on("connection", (socket) => {
    socket._rooms = []

    // -------------------------------------- ROOM JOIN / LEAVE LISTENERS -------------------------------------- 
    socket.on("join-room", (code, name) => {
        if (!code) return 
        socket.join(code)
        socket._name = name
        socket._rooms.push(code)
        console.log(`Socket: ${socket.id} joined ${code}`)
        socket.emit("room-joined", code,name, false)
    })

    socket.on("create-room", (name) => {
        const code = GenerateJoinCode()
        socket.join(code)
        socket._name = name
        socket._rooms.push(code)
        rooms[code] =  {files: [], admin: socket.id, usersCanEdit: false}
        socket.emit("room-joined", code,name, true)
    })

    socket.on("disconnect", () => {
        for (let room of socket._rooms) {
            if (rooms[room] && rooms[room].admin == socket.id) {
                console.log(`Admin has left ${room}`)
                socket.to(room).emit("room-closed")
                rooms[room] = null
            }
        }
    })

    // -------------------------------------- CANVAS LISTENERS -------------------------------------- 
    // socket.on("canvas-edited", (x1,y1,x2,y2, room) => {
    //     socket.to(room).emit("canvas-update", x1,y1,x2,y2)
    // })

    socket.on("canvas-image-edited", (blob, room) => {
        socket.to(room).emit("canvas-image-update", blob)
    })

    socket.on("canvas-cleared", (room:string) => {
        if (socket.id === rooms[room].admin) {
            socket.to(room).emit("canvas-cleared")
        }
    } )
    // -------------------------------------- FILE UPLOAD LISTENERS -------------------------------------- 
    
    socket.on("file-upload", (file, name, type,  room) => {
        socket.to(room).emit("files-uploaded", file, name, type)
    })
    // -------------------------------------- CHAT LISTENERS -------------------------------------- 

    socket.on("new-chat", (message: string, name: string, room: string) => {
        socket.to(room).emit("chat-recieved", {name, message, isOwn: false} as Chat)
    })
    
})}


module.exports = AddEvents