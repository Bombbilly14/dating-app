import React, { useEffect, useState } from 'react'

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

      const users=  connections.filter(connection => connection.accepted === true).map(connection => {
        return (
          <div key={connection.id}>
            <h1>{connection.recipient.name}</h1>
             
            <p>Bio: {connection.recipient.bio || 'Not provided'}</p>
            <p>Location: {connection.recipient.location}</p>
            <p>Gender: {connection.recipient.gender}</p>
            <p>Age: {connection.recipient.age}</p>
          </div>
        );
      });
  return (
    <div>{users}</div>
  )
}

export default MatchedUsersPage