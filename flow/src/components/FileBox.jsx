import React, { useContext, useState, useEffect } from 'react'
import socketContext from '../contexts/socketContext'

const FileBox = (props) => {
    const {room, Socket, isAdmin} = useContext(socketContext);
    const [files, setFiles] = useState([])

    useEffect(() => {
        if (Socket){
            Socket.on("files-uploaded", (file, name, type) => {
                console.log("File recieved")
                console.log(new Blob([file], {type, name}))
            })
        }
    })

    return (
        <div className = "file-box">
            {isAdmin && <input type = "file"  onChange = {e => {
                for (let file of e.target.files){
                    console.log(file)
                    Socket.emit("file-upload", file,file.name, file.type, room)
                }
            }}/>}
            <div className = "filebox-files">
                {files.map(f => <div>{f.name}</div>)}
            </div>
        </div>
    )
}

export default FileBox
