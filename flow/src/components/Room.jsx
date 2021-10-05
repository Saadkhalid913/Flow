import React, { useContext } from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
import ChatBox from './Chatbox/Chatbox'
import FileBox from './FileBox'
const Room = (props) => {
    const {room} = useContext(socketContext)
    if (!room) props.history.replace("/")
    return (
    <div className = "room-page-wrapper">
            {props.admin && <div>you are an admin</div>}
            <Canvas id = "canvas-element" width = {window.visualViewport.width * 0.8} />
            <FileBox />
            <ChatBox />
    </div>
    )
}

export default Room