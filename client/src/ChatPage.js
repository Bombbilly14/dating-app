import React, {useState, useEffect} from 'react'
import MessagesPage from './MessagesPage'

function ChatPage({me}) {
    const [recipientId, setRecipientId] = useState(null);
    const [matches, setMatches] = useState([])
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
            <div style={{display: 'flex'}}>
                <div>ChatPage</div>
                <div style={{marginLeft: '400px'}}>
                    
                    {matches.map((match) => (
                        <div key={match.id} onClick={() => handleUserClick(match.id)}>
                            {match.name}
                            
                        </div>
                    ))}
                </div>
            </div>
                    <MessagesPage recipientId={recipientId} matches={matches} user={me}/>
        </div>
    );
}

export default ChatPage