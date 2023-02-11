// import userEvent from '@testing-library/user-event';
import React from 'react'
import { Card, Button } from "semantic-ui-react";
import './styles/Home.css'

function CardComponent({match, handleClick}) {


    return (

        <Card>
          <Card.Content image="true">
            <img src={match.avatar.img} alt={match.id} />
          </Card.Content>
          <Card.Content>
            <Card.Header>{match.name}</Card.Header>
            <Card.Meta>
              <span>Joined in 2013</span>
            </Card.Meta>
            <Card.Description>
             {match.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          <Button onClick={handleClick} primary>Match with user</Button>
          </Card.Content>
        </Card>

      );
    }

export default CardComponent