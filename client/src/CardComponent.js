import React from 'react';
import { Button } from 'semantic-ui-react';
import './styles/Home.css';

function CardComponent({ user, me, handleInterest, handleClick }) {
  const handleLikeClick = () => {
    handleInterest(user, true);
  };

  const handleDislikeClick = () => {
    handleInterest(user, false);
  };

  return (
    <div className="card-profile" style={{ backgroundImage: `url(${user.avatar.img})` }}>
      <div className="card-profile-content">
        <h2>{user.name}, {user.age}</h2>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <p>{user.gender}</p>
        <div className="card-actions">
          <Button color="red" icon="close" content="No" onClick={handleDislikeClick} />
          <Button color="green" icon="check" content="Yes" onClick={() => handleClick(user) } />
        </div>
      </div>
    </div>
  );
}

export default CardComponent;
