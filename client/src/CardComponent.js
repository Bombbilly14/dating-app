import React from 'react';
import { Button } from 'semantic-ui-react';
import './styles/Home.css';

function CardComponent({ user, me, handleInterest, handleClick, connectionStatus, showMatchMessage, setShowMatchMessage }) {
 

  // const handleDislikeClick = () => {
  //   handleInterest(user, false);
  // };

  const handleMatchClick = () => {
    setShowMatchMessage(true);
    handleClick(user);
  };


  console.log('showMatchMessage:', showMatchMessage);
  return (
    <div className="card-profile" style={{ backgroundImage: `url(${user.avatar.img})` }}>
      <div className="card-profile-content">
        
        <h2>{user.name}, {user.age}</h2>
        <p>{user.location}</p>
        <p>{user.bio}</p>
        <p>{user.gender}</p>
        <div className="card-actions">
          <Button color="red" icon="close" content="Ignore"  />
          <Button color="green" icon="check" content="Match" onClick={handleMatchClick} />
        </div>
        {showMatchMessage && <div className="match-message">Match request sent!</div>}
      </div>
    </div>
  );
}

export default CardComponent;
