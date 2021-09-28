import React, { useContext, useState, useEffect, useRef } from 'react'
import socketContext from '../contexts/socketContext'

const Room = (props) => {
    const [text, setText] = useState("")
    const canvas = useRef()

    const Socket = useContext(socketContext)
    useEffect(() => {
        if (!Socket) return

        const handler = (text) => setText(text)
        Socket.on("text-changed", handler)
        return () => Socket.off("text-changed", handler)
    }, [setText, Socket])

    if (canvas.current) {
        canvas.current.addEventListener("mousemove", e => console.log(e.layerX, e.layerY))
    }

    return (
    <div className = "room-page-wrapper">
        {/* <textarea value = {text} onChange = {(e) => {
            setText(e.target.value)
            Socket.emit("update-text", e.target.value, props.match.params.id)
            }} />  */}
            <canvas ref = {canvas}  width = {900} height = {600}/>
    </div>
    )
}

export default Room