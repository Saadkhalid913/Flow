import React, { useContext, useEffect, useState } from 'react'
import socketContext from '../contexts/socketContext'

const FileBox = (props) => {
    const {room, Socket} = useContext(socketContext);

    return (
        <div className = "file-box">
            <input type = "file"  onChange = {e => {
                for (let file of e.target.files)
                    Socket.emit("file-upload", file, room)
            }}/>
        </div>
    )
}

export default FileBox
