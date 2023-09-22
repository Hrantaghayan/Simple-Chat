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
  const [user, setUser] = useState(null);
  const [partnerName, setPartnerName] = useState("");

  const join = async () => {
    await socket.emit("join_room", { room, name, id: socket?.id });
    setUser({ room: room, name: name, id: socket?.id });
    setIsfilled(true);
  };
  useEffect(() => {
    socket.on("room_data", (data) => {
      if (data?.length === 2) {
        const foundedItem = data.find((el) => {
          if (el?.id !== socket?.id) {
            return true;
          }
        });
        if (foundedItem) {
          setPartnerName(foundedItem?.username);
        }
      }
    });
  }, [socket]);

  return (
    <div className="App">
      {isFilled ? (
        <>
          <Header name={partnerName} />
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
