import React from 'react'
import { Card, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function MatchedCards({ connection, me }) {
  const user = connection.recipient_id === me.id ? connection.sender : connection.recipient;
  console.log(user)
  return (
    <Card>
      <Card.Content image="true">
        <img src={user.avatar_url} alt={user.id} />
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
        <Button primary>Message</Button>
      </Card.Content>
    </Card>
  )
}

export default MatchedCards;
