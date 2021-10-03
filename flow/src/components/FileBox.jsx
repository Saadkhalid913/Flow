import React, { useContext, useEffect, useState } from 'react'
import socketContext from '../contexts/socketContext'

const FileBox = (props) => {
    const {room, Socket, isAdmin} = useContext(socketContext);
    // const [files, setFiles] = useState([])

    return (
        <div className = "file-box">
            <input type = "file"  onChange = {e => {
                for (let file of e.target.files){
                    Socket.emit("file-upload", file, room)
                    console.log("File uploaded") 
                }
            }}/>
        </div>
    )
}

export default FileBox
