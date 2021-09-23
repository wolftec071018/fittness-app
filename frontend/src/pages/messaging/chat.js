import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./chat.css";
import 'bootstrap/dist/css/bootstrap.min.css'; //Bootstrap
import authHeader from '../../services/auth-header';
import axios from 'axios';
let socket;

const CONNECTION_PORT = "localhost:5200/";
const API_URL = 'http://localhost:5000/api/';



function Chat() {
  // Athlete
  const [userName, setUserName] = useState("");
  let userID;

  // Message
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]); //Keep a track to display

  //Get socket
  useEffect(() => {
    getName();
    console.log(userID);
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  //Socket on
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });

  //set name for user
  const getName =  async () => {
    const res = await axios.get(
        API_URL + "user/",
        { headers: authHeader() }
    );
    if(res.data.athlete){
      setUserName(res.data.athlete.name);
    }else if(res.data.trainer){
      setUserName(res.data.trainer.name);
    }
     return null;
  }

  //send message
  const sendMessage = async () => {
    let messageContent = {
      content: {
        author: userName,
        message: message,
      },
    };
    await socket.emit("send_message", messageContent); //emit new message except to sender
    setMessageList([...messageList, messageContent.content]);  // store chat hist
    setMessage("");
  };
  return (
    <div className="App">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Chat with personal trainer</h1>
          <p class="lead">Chat with your trainer/athlete</p>
        </div>
      </div>
      <dashboardNav></dashboardNav>

      {(
        <div className="chatContainer">
          <div className="messages">
            {messageList.map((val, key) => {
              return (
                <div
                  className="messageContainer"
                  id={val.author === userName ? "You" : "Other"}
                >
                  <div className="messageIndividual">
                    {val.author}: {val.message}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="messageInputs">
            <form>
              <input className="inputChat"
                type="rest"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
          </form>
            <button onClick={sendMessage}>Send</button>
                
          </div>

        </div>
        
      )}
<form>
  <button formaction="http://localhost:3000/Dashboard">Back Home!</button>
</form>
    </div>
  );
}

export default Chat;
