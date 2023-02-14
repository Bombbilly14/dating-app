import {useEffect, useState} from 'react'
import React from 'react'
import ActionCable from 'actioncable'
import Messaging from './Messaging.jsx'

const CableApp = {}

CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')


function MessagesPage({user, recipientId, matches}) {
  const [messages, setMessages] = useState([])

  


  const recipient_id = recipientId
  const sender_id = user.id
  const channel_name = [recipient_id, sender_id].sort().join("_");

  const fetchMessages = async () => {
    const response = await fetch(`/messages?recipient_id=${recipient_id}&sender_id=${sender_id}`)
    const data = await response.json()

    setMessages(data)

}

useEffect(() => {
  
    if (user.id && recipientId) {
      console.log("hi")
      fetchMessages()
      
       const channel =  CableApp.cable.subscriptions.create(
          {
            command: "subscribe",
            channel: `MessagesChannel`,
            room: `${channel_name}`
          },
          {
            received: (data) => {
              setMessages(messages => [...messages, data])

            },
          }
        );
        return () => {
          channel.unsubscribe();
        };
      
    }
  }, [ user, user.id, recipient_id]);





const handleSubmit = async (e) => {
  e.preventDefault();

  const body = e.target.message.value;
  e.target.message.value = "";

  const response = await fetch("/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({  body, recipient_id }),
  });

  if (response.ok) {
    const data = await response.json();
    setMessages([...messages, data]);
  }
};



    return (
      <div className="App">
        <Messaging />
        <div className="messages-header">
          <h1> messages:</h1>
        </div>
       <div className="messages-body">
        {messages.map((message) => {
          const recipient = matches.find(match => match.id === recipient_id);
          const recipientName = recipient ? recipient.name : null;
          const userName = message.sender_id === user.id ? "You" : recipientName
          return <div className="messages" key={message.id}>
            <p>{userName}: {message.body}</p>
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

