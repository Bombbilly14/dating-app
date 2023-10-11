import React from 'react'
import { useNavigate } from "react-router-dom";
import { Card, Button } from "semantic-ui-react";

function MatchedCards({ connection, me }) {
  const navigate = useNavigate()
  const user = connection.recipient_id === me.id ? connection.sender : connection.recipient;

  const handleMessageClick = () => {
   
    navigate('/messages');
  };
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
        <Button primary onClick={handleMessageClick} >Message</Button>
      </Card.Content>
    </Card>
  )
}

export default MatchedCards;
