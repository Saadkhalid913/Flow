import React, {useState,useEffect, useContext} from 'react'
import socketContext from '../contexts/socketContext'
import { toast } from "react-toastify"


const RoomScreen = (props) => {
    const [code, setCode] = useState("")
    const {Socket, name, setName, setRoom, setIsAdmin} = useContext(socketContext)
    useEffect(() => {
        if (!Socket) return

        const handler = (code, name, isAdmin) => {
            setRoom(code)
            setIsAdmin(isAdmin)
            setName(name)
            if (isAdmin)
                props.history.push("/room/admin/" + code)
            else
                props.history.push("/room/" + code)
        }

        Socket.on("room-joined", handler)

        return () => Socket.off("room-joined", handler)
        
    }, [Socket, setIsAdmin,setName, props, setRoom])

    const JoinRoom = () => {
        if (name && code) {
            Socket.emit("join-room", code, name)}
        else if (!code) toast.warn("Please enter the room code")
        else if (!name) toast.warn("Please enter a name")}

    const CreateRoom = () => {
        if (name) {Socket.emit("create-room", name)}
        else toast.warn("Please enter a name")
    }

    return (
       <div className = "room-join-screen-wrapper">
            <div className = "room-join-box">
                <div>
                    <input placeholder = "Name" onChange={e => setName(e.target.value)} />
                </div>
                <div>
                    <input placeholder = "Room Code" onChange = {(e) => {setCode(e.target.value)}} />
                    <button onClick ={JoinRoom}>Join Room</button>
                </div>
               <button onClick ={CreateRoom}>Create Room</button>
            </div>
       </div>
    )

}

export default RoomScreen
