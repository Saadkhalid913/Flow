import React, { useContext } from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
import FileBox from './FileBox'
const Room = (props) => {

    const {room} = useContext(socketContext)
    if (!room) props.history.replace("/")

    return (
    <div className = "room-page-wrapper">
            <Canvas id = "canvas-element" width = {window.screen.width * 0.85} height = {window.screen.width * 0.5}/>
            <FileBox />
    </div>
    )
}

export default Room