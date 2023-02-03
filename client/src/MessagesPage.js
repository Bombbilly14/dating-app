import {useEffect, useState} from 'react'
import React from 'react'




function MessagesPage({user, recipientId, matches}) {
  const [messages, setMessages] = useState([])
  

  const recipient_id = recipientId
  const sender_id = user.id
  const channel_name = [recipient_id, sender_id].sort().join("_");

  const ws = new WebSocket(`ws://localhost:3000/cable?recipient_id=${recipient_id}&sender_id=${sender_id}`)

  ws.onopen = () => {

    console.log('connecting to websocket server')
    ws.send(
      JSON.stringify({
        command: "subscribe",
        identifier: JSON.stringify({
          // recipient_id?? 
          // "messages_channel_#{recipient_id}"
          channel: `messages_channel_${channel_name}`,
        })
      })
      )
    }
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;
  
      const message = data.message;
      setMessages([...messages, message]);
    };
    const fetchMessages = async () => {
      const response = await fetch('/messages')
      const data = await response.json()
    
      setMessages(data)
  }

  useEffect(() => {
    fetchMessages()

  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = e.target.message.value;
    e.target.message.value = "";

    await fetch("/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  body, recipient_id, sender_id  }),
    });
  };

  
  
    return (
      <div className="App">
        <div className="messages-header">
          <h1> messages:</h1>
          <p>Guid:</p>
        </div>
       <div className="messages-body" id="messages">
        {messages.map((message) => {
          return <div className="messages" key={message.id}>
            <p>{user.name}: {message.body}</p>
             </div>
        })}
        </div>
        <div className="messageForm">
          <form onSubmit={handleSubmit}>
            <input className="messageInput" type="text" name="message" />
            <button className="messageButton" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    );
  }
  export default MessagesPage;

