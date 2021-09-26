import React, {useState, useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

const Homepage = (props) => {
    const [text, setText] = useState("")

    const Socket = useContext(socketContext)

    useEffect(() => {
        if (!Socket) return
        console.log("Added event Listener")
        const handler = (text) => setText(text)
        Socket.on("text-changed", )
        


    }, [Socket])

    return (
        <div>
            <textarea value = {text} onChange = {(e) => {
                setText(e.target.value)
                Socket.emit("update-text", e.target.value)
                }}/>
        </div>
    )
}


export default Homepage