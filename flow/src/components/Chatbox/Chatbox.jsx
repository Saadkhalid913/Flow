import React, { useContext , useEffect, useState} from 'react'
import SocketContext from "../../contexts/socketContext"
import Chat from './Chat'
import { IoIosArrowForward } from "react-icons/io"

const ChatBox = (props) => {
    const [chats, setChats] = useState([])
    const {room, Socket, name} = useContext(SocketContext);
    const [message, setMessage] = useState("")
    const [inView, toggleView] = useState(false)

    const SendChat = () => {
        if (!message) return
        Socket.emit("new-chat", message, name, room)
        const chat = {name, message, isOwn: true}
        setChats([...chats, chat])
        setMessage("")
    }

    useEffect(() => {
        if (!Socket) return

        const handler = ({name, message, isOwn}) => {
            const chat = {name, message, isOwn}
            setChats([...chats, chat])
        }

        Socket.on("chat-recieved", handler)
        
        return () => Socket.off("chat-recieved", handler)

    }, [setChats, Socket, chats]) 

    let Styles = {}
    if (window.screen.width > 768 && inView) Styles = {right: "0%"} 
    if (window.screen.width > 768 && !inView) Styles = {right: "-30%"} 
    if (window.screen.width < 768 && !inView) Styles = {top: "100%"} 
    if (window.screen.width < 768 && inView) Styles = {top: "10%"} 
    return (
       <React.Fragment>
           <button onClick = {() => toggleView(!inView)} > Toggle Chat</button>
            <div className = "chatbox" style = {Styles}>
            <button className = "chatbox-toggle" onClick = {() => toggleView(false)}><IoIosArrowForward/></button>
            <div className = "chatbox-chats">
                {chats.map(c => <Chat key = {c.name + c.message + Math.random()} chat = {c} />)}
            </div>
            <div className= "chat-message-box">
                <input placeholder ="Write a message" value={message} onChange = {e => setMessage(e.target.value)}/>
                <button onClick = {SendChat}>Send</button>
            </div>
        </div>
       </React.Fragment>
    )
}


export default ChatBox
