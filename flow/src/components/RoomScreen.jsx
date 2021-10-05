import React, {useState,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'

const RoomScreen = (props) => {
    const [code, setCode] = useState("")
    const {Socket, setRoom, setIsAdmin} = useContext(socketContext)
    const [name, setName] = useState("")
    useEffect(() => {
        if (!Socket) return

        const handler = (code, isAdmin) => {
            setRoom(code)
            setIsAdmin(isAdmin)
            if (isAdmin)
                props.history.push("/room/admin/" + code)
            else
                props.history.push("/room/" + code)
        }

        Socket.on("room-joined", handler)

        return () => Socket.off("room-joined", handler)
        
    }, [Socket,setIsAdmin, props, setRoom])


    return (
       <div className = "room-join-screen-wrapper">
            <div className = "room-join-box">
                <input onChange={e => setName(e.target.value)} />
                <div>
                    <input placeholder = "room code" onChange = {(e) => {setCode(e.target.value)}} />
                    <button onClick ={() => Socket.emit("join-room", code, name)}>Join Room</button>
                </div>
               <button onClick ={() => Socket.emit("create-room", name)}>Create Room</button>
            </div>
       </div>
    )

}

export default RoomScreen
