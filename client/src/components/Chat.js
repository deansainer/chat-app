import React, { useEffect, useState } from 'react'
import '../App.css'

const Chat = ({socket, username, room}) => {
    const [message, setMessage] = useState('')

    async function sendMessage() {
        if(message){
            const messageData = {
                room: room,
                username: username,
                message: message,
                time: new Date(Date.now()).getHours() + ':' + new Date(Date.now()).getMinutes()
            }
            await socket.emit('send_message', messageData)
        }
    }
    useEffect(() => {
        socket.on('recieve_message', (messageData) => {
            console.log(messageData);
        })
    })

    return (
        <div>
            <div className='chat-header'>
                <h4>Room Chat</h4>
            </div>
            <div className='chat-body'></div>
            <div className='chat-footer'>
                <input value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='Type smth..'/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default Chat