import React, { useContext } from 'react'
import socketContext from '../contexts/socketContext'
import Canvas from './Canvas'
const Room = (props) => {

    const {room} = useContext(socketContext)
    if (!room) props.history.replace("/")

    return (
    <div className = "room-page-wrapper">
            <Canvas  width = {1600} height = {900}/>
    </div>
    )
}

export default Room