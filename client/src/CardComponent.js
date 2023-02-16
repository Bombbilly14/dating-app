// import userEvent from '@testing-library/user-event';
import React from 'react'
import { Card } from "semantic-ui-react";
import './styles/Home.css'
import { Link } from "react-router-dom";
import UserProfile from './UserProfile';

function CardComponent({match, me}) {
  

    return (

        <Card>
          <Card.Content image="true">
          <Link to={`/users/${match.id}`} element={<UserProfile />}>
            <img src={match.avatar.img} alt={match.id} />
            </Link>
          </Card.Content>
          <Card.Content>
            <Card.Header>{match.name}</Card.Header>
            <Card.Meta>
              <span>{match.age} years old</span>
            </Card.Meta>
            <Card.Description>
             {match.bio}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
          
          </Card.Content>
        </Card>

      );
    }

export default CardComponent