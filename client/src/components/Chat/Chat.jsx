import React, { useEffect, useState } from "react";
import { FaRegPaperPlane as FiSend } from "react-icons/fa";
import ScrollToBottom from "react-scroll-to-bottom";
import "./Chat.css";
// BsFillSendFill
export default function Chat({ socket, room, name }) {
  const [messageList, setMessageList] = useState([]);
  const [messageInfo, setMessageInfo] = useState({
    message: "",
    from: name,
    date: "",
    room: room,
  });
  const senDmessage = async () => {
    if (messageInfo?.message !== "") {
      await socket.emit("send_message", messageInfo);
      setMessageList((list) => [...list, messageInfo]);
      setMessageInfo({
        message: "",
        from: name,
        date: "",
        room: room,
      });
    }
  };
  useEffect(() => {
    const eventListener = (data) => {
      setMessageList((list) => [...list, data]);
    };
    socket.on("receive_message", eventListener);
    return () => socket.off("receive_message", eventListener);
  }, [socket]);

  return (
    <div className="chat">
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList?.map((message, i) => {
            return (
              <div
                className={
                  message?.from === name
                    ? "message-right-wrapper"
                    : "message-left-wrapper"
                }
                key={i}
              >
                <p
                  className={
                    message?.from === name
                      ? "mesage-right-text"
                      : "mesage-left-text"
                  }
                >
                  {message?.message}
                </p>
                <p className={message?.from === name ? "you" : "partner"}>
                  {message?.from === name
                    ? `you ${message.date}`
                    : `${message?.from} ${message?.date}`}{" "}
                </p>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-sending">
        <textarea
          type="text"
          className="message-inp"
          resize="none"
          placeholder="Write your mesage here ..."
          value={messageInfo?.message}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              senDmessage();
            }
          }}
          onChange={(e) => {
            setMessageInfo({
              ...messageInfo,
              message: e.target.value,
              date: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
            });
          }}
        />
        <button
          className="send-btn"
          onClick={() => {
            senDmessage();
          }}
        >
          <FiSend color="#ffffff" />
          <p className="send-text">Send</p>
        </button>
      </div>
    </div>
  );
}
