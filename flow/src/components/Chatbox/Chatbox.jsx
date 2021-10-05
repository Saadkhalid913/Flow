import React, { useContext , useEffect, useState} from 'react'
import SocketContext from "../../contexts/socketContext"
const ChatBox = (props) => {
    const [chats, setChats] = useState([])
    const {room, Socket, name} = useContext(SocketContext);
    const [message, setMessage] = useState("")
    useEffect(() => {
        if (!Socket) return

        const handler = ({name, message, isOwn}) => {
            const chat = {name, message, isOwn}
            setChats([...chats, chat])
        }

        Socket.on("chat-recieved", handler)
        
        return () => Socket.off("chat-recieved", handler)

    }, [setChats, Socket, chats])
    return (
        <div className = "chatbox">
            <div>
                {chats.map(c => <div>{c.name + " -- " + c.message}</div>)}
            </div>
            <div>
                <input onChange = {e => setMessage(e.target.value)}/>
                <button onClick = {() => Socket.emit("new-chat", message, name, room)}>Send</button>
            </div>
        </div>
    )
}


export default ChatBox
