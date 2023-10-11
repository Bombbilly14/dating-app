import React, {useState, useEffect} from 'react'
import ActionCable from 'actioncable'
import Messaging from './Messaging.jsx'

const CableApp = {}

CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')

function ChatPage({me}) {
    const [recipientId, setRecipientId] = useState(null);
    const [matches, setMatches] = useState([])
    const [messages, setMessages] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState(null);

    const user = me
    //too late to go back now, user is always me :(



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

  console.log("Channel Name:", channel_name);



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
   

useEffect(() => {
  setIsLoading(true);
  fetch(`/connections?sender_id=${me.id}&accepted=true`)
      .then((res) => res.json())
      .then((data) => {
        const userConnections = data.filter(connection => connection.sender_id === me.id || connection.recipient_id === me.id);
        setMatches(userConnections);
        setIsLoading(false)
      });
}, []);

const handleUserClick = (id) => {
  const selectedUser = matches.find(user => user.id === id);
  
  if (selectedUser) {
    const isSender = selectedUser.sender_id === me.id;
    setRecipientId(isSender ? selectedUser.recipient_id : selectedUser.sender_id);
    setCurrentUser(selectedUser);
  }
};




      return (
        <div>
            <Messaging currentUser={currentUser} matches={matches} isLoading={isLoading} handleUserClick={handleUserClick} messages={messages} me={me} handleSubmit={handleSubmit}/>
        </div>
    );
}

export default ChatPage