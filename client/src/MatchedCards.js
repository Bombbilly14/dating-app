import React from 'react'
import { Card, Button } from "semantic-ui-react";
function MatchedCards({connection, me}) {
    console.log(connection)
    const user = connection.recipient_id === me.id ? connection.sender : connection.recipient;
  return (
    <Card>
        <Card.Content image="true">
        <img src={user.avatar.img} alt={user.id} />
        </Card.Content>
        <Card.Content>
        <Card.Header>{user.name}</Card.Header>
        <Card.Meta>
             <span>Joined in 2013</span>
          </Card.Meta>
         <Card.Description>
         {user.bio}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button  primary>Message</Button>
         </Card.Content>
     </Card>
  )
}

export default MatchedCards