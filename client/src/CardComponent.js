import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './styles/Home.css';

function CardComponent({ user, handleClick, showMatchMessage, setShowMatchMessage }) {
 
  const handleMatchClick = () => {
    setShowMatchMessage(true);
    handleClick(user);
    console.log(showMatchMessage)
  };


  return (
    <div className="card-profile" style={{ backgroundImage: `url(${user.avatar.img})` }}>
      <div className="card-profile-content">
      <Link to={`/users/${user.id}`}>
        <h2>{user.name}, {user.age}</h2>
        </Link>
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
