import React from 'react'

const Chat = (props) => {
    const {message, name, isOwn} = props.chat
    return (
        <div className = {isOwn ? "own-chat-message" : "chat-message"}>
            <h5>{isOwn ? "You" : name}</h5>
            <p>{message}</p>
        </div>
    )

}

export default Chat