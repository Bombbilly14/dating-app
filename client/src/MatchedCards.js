import React from 'react'
import { Card, Button } from "semantic-ui-react";
function MatchedCards({connection}) {
    console.log(connection)
  return (
    <Card>
        <Card.Content image="true">
        <img src={connection.recipient.avatar.img} alt={connection.id} />
        </Card.Content>
        <Card.Content>
        <Card.Header>{connection.recipient.name}</Card.Header>
        <Card.Meta>
             <span>Joined in 2013</span>
          </Card.Meta>
         <Card.Description>
         {connection.recipient.bio}
        </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <Button  primary>Message</Button>
         </Card.Content>
     </Card>
  )
}

export default MatchedCards