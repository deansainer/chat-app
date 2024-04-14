import "./App.css";
import io from "socket.io-client";
import {useState} from 'react'
import Chat from "./components/Chat";

const socket = io.connect("https://chat-app-server-three-bay.vercel.app/"); // socket server


function App() {
  const [errorMessage, setErrorMessage] = useState('')
  
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)


  function joinRoom() {
    if(username && room){
      socket.emit('join_room', room)  // receiving room id to backend
      setShowChat(true)
    } else {
      setErrorMessage('All the fields must be filled')
    }
  }

  return (
    <div className="App">
      {showChat ? (
      <div>
        <Chat socket={socket} username={username} room={room}/>
      </div>) : (
      <div className="join-chat-window">
      <h2>Join a chat</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Enter your name.."/>
        <input value={room} onChange={(e) => setRoom(e.target.value)} type="text" onKeyPress={(e) => e.key==='Enter' && joinRoom()} placeholder="Enter room ID..."/>
        <button onClick={joinRoom}>Join</button>
        <p className="error_messsage">{errorMessage}</p>
      </div>
      )
      }
    </div>
  );
}

export default App;
