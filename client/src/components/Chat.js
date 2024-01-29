import React, { useEffect, useState } from 'react'
import '../App.css'
import ScrollToBottom from 'react-scroll-to-bottom'

const Chat = ({socket, username, room}) => {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    async function sendMessage() {
        if(message){
            const messageData = {
                room: room,
                username: username,
                message: message,
                time: `${new Date().getHours() < 10 ? '0' : ''}${new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`
            }
            await socket.emit('send_message', messageData)
            setMessageList((prevMessageList) => [...prevMessageList, messageData])
            setMessage('')
        }
    }
    useEffect(() => {
        socket.on('recieve_message', (messageData) => {
        setMessageList((prevMessageList) => [...prevMessageList, messageData])
        })
    }, [socket])

    return (
        <div>
            {username}
            <div className='room-chat'>
                <div className='chat-header'>
                    <span>Room Chat</span>
                </div>
                <ScrollToBottom className='chat-body'>
                <div className='chat-body'>
                    {messageList.map((messageItem) => (
                    <div className='message' id={username === messageItem.username ? 'you' : 'other'}>
                        <div className='message-content'>
                            <span>{messageItem.message}</span>
                        </div>
                        <div className='message-meta'>
                            <span>{messageItem.username} in {messageItem.time}</span>
                        </div>
                    </div>))}
                </div>
                </ScrollToBottom>

                <div className='chat-footer'>
                    <input onKeyPress={(e) => {e.key === 'Enter' && sendMessage()}} value={message} onChange={(e) => setMessage(e.target.value)} type='text' placeholder='  Hey..'/>
                    <button onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat