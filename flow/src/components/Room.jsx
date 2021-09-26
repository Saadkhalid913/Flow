import React, { useContext, useState, useEffect } from 'react'
import socketContext from '../contexts/socketContext'

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
    <div>
        <textarea value = {text} onChange = {(e) => {
            setText(e.target.value)
            Socket.emit("update-text", e.target.value, props.match.params.id)
            }} /> 
    </div>
    )
}

export default Room