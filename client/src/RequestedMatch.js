import React, {useEffect, useState} from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

function RequestedMatch({connection, me, receivedConnections, setReceivedConnections, setAcceptedConnectionId}) {
  
  const [connectionStatus, setConnectionStatus] = useState(null);
    const user = connection.recipient_id === me.id ? connection.sender : connection.recipient;
    console.log(user)


 

    const handleClick = (user) => {
      fetch(`/connections/${connection.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accepted: true
        })
      })
        .then(response => {
          if (!response.ok) {
            setConnectionStatus('repeated')
            setTimeout(() => {
              setConnectionStatus(null);
            }, 4000);
            throw new Error("Failed to update connection")
          }
          return response.json();
        })
        .then(updatedConnection => {
          console.log("Connection updated:", updatedConnection);
          setConnectionStatus(updatedConnection && updatedConnection.accepted === true ? 'true' : 'null');
    
          setTimeout(() => {
            setConnectionStatus(null);
          }, 4000);

          setReceivedConnections(receivedConnections.map(conn => {
            if (conn.id === updatedConnection.id) {
              return updatedConnection;
            } else {
              return conn;
            }
          }));
          setAcceptedConnectionId(updatedConnection.id);
        })
        .catch(error => {
          console.error(error);
        });
    };
    


  
    return (

    <Card.Group>
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src={user.avatar_url}
        />
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>{user.age}</Card.Meta>
        <Card.Description>
          {user.name} wants to connect!
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='green' onClick={() => handleClick(user)}>
            Approve
          </Button>
          <Button basic color='red'>
            Decline
          </Button>
        </div>
      </Card.Content>
    </Card>
  </Card.Group>
    )
}

export default RequestedMatch