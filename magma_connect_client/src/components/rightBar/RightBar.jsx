import "./rightBar.scss";
import ProfilePic from "../../assets/user.png";
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from "axios";
import io from "socket.io-client";
const socket = io("ws://localhost:8800");

export const RightBarChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageList, setMessageList] = useState([]);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [room, setRoom] = useState("");
  const [chatUser, setChatUser] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Fetch all connected users from the backend API
    const username = currentUser.username;
    axios
      .get(`http://localhost:8800/api/auth/getConnectedUsers/${username}`)
      .then((res) => {
        setConnectedUsers(res.data);
        setRoom(res.data[0].room);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMessageSend = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
  
    const messageInput = event.target.elements.message; // Get the input field for the message
    const data = {
      newMessage: messageInput.value.trim(), // Get the trimmed value of the input field
      author: currentUser.username, // Get the username of the current user
      room: room, // Get the room information
    };
  
    // Check if the new message is not empty
    if (data.newMessage !== "") {
      setMessages((prevMessages) => [...prevMessages, data.newMessage]); // Update the messages state by adding the new message
      messageInput.value = ""; // Clear the input field value
      await socket.emit("send_message", data); // Send the message data to the server using the socket
      setMessageList((prevMessageList) => [...prevMessageList, data]); // Update the message list state by adding the new message data
    }
  };
  

  useEffect(() => {
    socket.on("receive_message", (data) => {
      if (data.author === chatUser && data.room === room) {
        setMessageList((prevMessageList) => [...prevMessageList, data]);
      }
    });
  }, [socket, chatUser, room]);

  const handleClick = (user) => {
    setChatUser(user);
    console.log(room);
  };

  useEffect(() => {
    if (chatUser !== "" && room !== "") {
      socket.emit("join_room", room);
    }
  }, [chatUser, room]);

  return (
    <div className="rightbar">
      <div className="whomYouChatWith">
        <div className="heading">
          <h1>Select to chat with</h1>
        </div>
        <div className="chatheads">
          {connectedUsers.map((connectedUser) => (
            <div
              onClick={() => handleClick(connectedUser.entre1)}
              key={connectedUser.entre1}
              className="selectchat"
            >
              <img src={ProfilePic} alt="" />
              <span>{connectedUser.business_name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-container">
        <div className="chat-header">
          <span>Chat</span>
          <span className="chatName">{chatUser}</span>
        </div>
        <div className="chat-messages">
          {messageList.map((message) => (
            <div
              className={
                currentUser.username === message.author
                  ? "message you"
                  : "message other"
              }
              key={message.id}
            >
              <span>{message.newMessage}</span>
            </div>
          ))}
        </div>

        <form className="chat-form" onSubmit={handleMessageSend}>
          <input type="text" name="message" placeholder="Type your message" />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};
