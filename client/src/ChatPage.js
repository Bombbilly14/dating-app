import React, {useState, useEffect} from 'react'
// import MessagesPage from './MessagesPage'
import ActionCable from 'actioncable'
import Messaging from './Messaging.jsx'

const CableApp = {}

CableApp.cable = ActionCable.createConsumer('ws://localhost:3000/cable')

function ChatPage({me}) {
    const [recipientId, setRecipientId] = useState(null);
    const [matches, setMatches] = useState([])
    const [messages, setMessages] = useState([])
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
    //Matches are all users for now

    useEffect(() => {

        fetch("/users")
          .then((res) => res.json())
          .then((data) => {

            setMatches(data);
          });
      }, []);

    const handleUserClick = (id) => {
        setRecipientId(id);
        console.log(`This is recipients ID: ${recipientId}`)
      };


      return (
        <div>
            {/* <div style={{display: 'flex'}}>
                <div>ChatPage</div>
                <div style={{marginLeft: '400px'}}>
                    
                    {matches.map((match) => (
                        <div key={match.id} onClick={() => handleUserClick(match.id)}>
                            {match.name}
                            
                        </div>
                    ))}
                </div>
            </div> */}
            <Messaging matches={matches} handleUserClick={handleUserClick} messages={messages} me={me} handleSubmit={handleSubmit}/>
                    {/* <MessagesPage recipientId={recipientId} matches={matches} user={me}/> */}
        </div>
    );
}

export default ChatPage