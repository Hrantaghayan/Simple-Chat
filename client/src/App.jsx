import { useEffect, useState } from "react";
import "./App.css";
import { Header, Chat } from "./components";
import ChatImage from "./assets/chatImage.webp";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3001");

function App() {

  const [isFilled, setIsfilled] = useState(false);
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  const join = () => {
    socket.emit("join_room", room);
    setIsfilled(true);
  };
 
  return (
    <div className="App">
      {isFilled ? (
        <>
          <Header name={name} />
          <Chat socket={socket} room={room} name={name} />
        </>
      ) : (
        <div className="img-wrapper">
          <img src={ChatImage} alt="ChatImage" className="img" />
          <div className="joining">
            <input
              type="text"
              placeholder="Name..."
              className="inp"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder="roomId..."
              className="inp"
              onChange={(e) => {
                setRoom(e.target.value);
              }}
            />
            <button className={name && room ? "btn" : "none"} onClick={join}>
              <p className="join">Join</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

