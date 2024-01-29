import "./App.css";
import io from "socket.io-client";
import {useState} from 'react'
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:3001"); // socket server


function App() {
  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')
  const [showChat, setShowChat] = useState(false)


  function joinRoom() {
    if(username && room){
      socket.emit('join_room', room)  // receiving room id to backend
      setShowChat(true)
    } else {
      console.log('All the fields must be filled');
    }
  }

  return (
    <div className="App">
      {showChat ? (
      <div>
        <Chat socket={socket} username={username} room={room}/>
      </div>) : (
      <div>
      <h2>Join a chat</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="John.."/>
        <input value={room} onChange={(e) => setRoom(e.target.value)} type="text" placeholder="Room ID..."/>
        <button onClick={joinRoom}>Join</button>
      </div>)
      }
    </div>
  );
}

export default App;
