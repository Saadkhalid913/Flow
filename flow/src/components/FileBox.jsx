import React, { useContext, useState, useEffect } from 'react'
import socketContext from '../contexts/socketContext'

const FileBox = (props) => {
    const {room, Socket, isAdmin} = useContext(socketContext);
    const [files, setFiles] = useState([])

    useEffect(() => {
        if (Socket){
            Socket.on("files-uploaded", (file, name, type) => {
                setFiles([...files, {link: URL.createObjectURL(new Blob([file], {type, name})), name}])
            })
        }
    })

    return (
        <div className = "file-box">
            {isAdmin && <input type = "file"  onChange = {async (e) => {
                for (let file of e.target.files){
                    const buffer = await file.arrayBuffer()
                    Socket.emit("file-upload", buffer, file.name, file.type, room)
                    setFiles([...files, {link: URL.createObjectURL(new Blob([file], {type: file.type, name: file.name})), name: file.name}])
                }
            }}/>}
            <div className = "filebox-files">
                <br/>
                <h3>Session Files: </h3>
                {files.map(f => <div key = {f.name} className = "file-box-file" >
                        <span onClick = {() => window.open(f.link)}>{f.name}</span>
                        {isAdmin && <button className = "btn-delete" onClick = {() => {
                            const index = files.indexOf(f);
                            const oldFiles = [...files]
                            oldFiles.splice(index, 1)
                            setFiles(oldFiles)
                        }}>Delete</button>}
                        </div>)}
            </div>
        </div>
    )
}

export default FileBox
