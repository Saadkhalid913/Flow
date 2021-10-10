import React, { useContext , useState} from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
import ChatBox from './Chatbox/Chatbox'
import FileBox from './FileBox'
const Room = (props) => {
    const {room} = useContext(socketContext)
    if (!room) props.history.replace("/")
    const [WindowWidth, setWindowWidth] = useState(window.innerWidth)

    window.addEventListener("resize", () => {
        setWindowWidth(window.innerWidth)}
        )

    return (
    <div className = "room-page-wrapper">
            <Canvas id = "canvas-element" width = {WindowWidth * 0.8} />
            <FileBox />
            <ChatBox />
    </div>
    )
}

export default Room