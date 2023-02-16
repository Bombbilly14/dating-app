import React from 'react'
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import MessagesPage from './MessagesPage'
function MatchedCards({connection, me}) {
    console.log(connection)
    const user = connection.recipient_id === me.id ? connection.sender : connection.recipient;
  return (
    <>
    
    <Card>
       
        <Card.Content image="true">
        {/* <img src={connection.sender.avatar.img}alt={user.id} /> */}
        </Card.Content>
        <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>
             <span>{user.bio}</span>
          </Card.Meta>
         <Card.Description>
         {user.age} years old
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Link to={`/messages`} element={<MessagesPage />}>
        <Button  primary>Message</Button>
        </Link>
         </Card.Content>
     </Card>
     </>
  )
}

export default MatchedCards