import React, { useContext , useEffect, useState} from 'react'
import SocketContext from "../../contexts/socketContext"
const ChatBox = (props) => {
    const [chats, setChats] = useState([])
    const {room, Socket, name} = useContext(SocketContext);
    const [message, setMessage] = useState("")
    const [inView, toggleView] = useState(false)


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
            <button onClick = {() => toggleView(false)}>Down</button>
            <div className = "chatbox-chats">
                dawd
                {chats.map(c => <div>{c.name + " -- " + c.message}</div>)}
            </div>
            <div className= "chat-message-box">
                <input onChange = {e => setMessage(e.target.value)}/>
                <button onClick = {() => Socket.emit("new-chat", message, name, room)}>Send</button>
            </div>
        </div>
       </React.Fragment>
    )
}


export default ChatBox
