import React, { useContext } from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
import FileBox from './FileBox'
const Room = (props) => {
    console.log(window.visualViewport.width)
    console.log(window.visualViewport.height)
    const {room} = useContext(socketContext)
    if (!room) props.history.replace("/")
    console.log(window.screen)
    return (
    <div className = "room-page-wrapper">
            <Canvas id = "canvas-element" width = {window.visualViewport.width * 0.7} 
                                          height = {(window.visualViewport.width * 0.7) * 9/16}  />
            <FileBox />
    </div>
    )
}

export default Room