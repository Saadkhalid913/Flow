import React, { useContext, useState, useEffect } from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
const Room = (props) => {
    const [text, setText] = useState("")

    const Socket = useContext(socketContext)
    useEffect(() => {
        if (!Socket) return

        const handler = (text) => setText(text)
        Socket.on("text-changed", handler)
        return () => Socket.off("text-changed", handler)
    }, [setText, Socket])


    return (
    <div className = "room-page-wrapper">
        {/* <textarea value = {text} onChange = {(e) => {
            setText(e.target.value)
            Socket.emit("update-text", e.target.value, props.match.params.id)
            }} />  */}
            <Canvas  width = {900} height = {600}/>
    </div>
    )
}

export default Room