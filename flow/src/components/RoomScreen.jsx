import React, {useState,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

const RoomScreen = (props) => {
    const [code, setCode] = useState("")
    console.log("Rendering...")
    const Socket = useContext(socketContext)

    useEffect(() => {
        if (!Socket) return

        const handler = (code) => props.history.push("/room/" + code)
        Socket.on("room-joined", handler)

        return () => Socket.off("room-joined", handler)
        
    }, [Socket, props])


    return (
       <div className = "room-join-screen-wrapper">
            <div className = "room-join-box">
                <div>
                    <input placeholder = "room code" onChange = {(e) => {setCode(e.target.value)}} />
                    <button onClick ={() => Socket.emit("join-room", code)}>Join Room</button>
                </div>
               <button onClick ={() => Socket.emit("create-room")}>Create Room</button>
            </div>
       </div>
    )

}

export default RoomScreen
