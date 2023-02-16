import React, { useEffect, useState } from 'react'
import MatchedCards from './MatchedCards.js'

function MatchedUsersPage({me}) {
const [connections, setUserConnections] = useState([])
useEffect(() => {
  fetch(`/connections?sender_id=${me.id}&accepted=true`)
  .then(response => response.json())
  .then(connections => {
            const userConnections = connections.filter(connection => connection.sender_id === me.id || connection.recipient_id === me.id);

            setUserConnections(userConnections);
            console.log(userConnections)
          });
        }, [me.id]);

        const users=  connections.filter(connection => connection.accepted === true).map((connection, index) => {
          return (
            <MatchedCards connection={connection} key={index} me={me}/>
            );
          });
  return (
    <div>{users}</div>
  )
}

export default MatchedUsersPage