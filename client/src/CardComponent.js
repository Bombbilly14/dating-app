import React, { useState } from 'react';
import { Modal, Button } from 'semantic-ui-react';
import './styles/Home.css';

function CardComponent({ match, me, handleInterest, allUsers }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCurrentIndex(null);
  };

  const handleLikeClick = () => {
    handleInterest(match, true);
    handleClose();
  };

  const handleDislikeClick = () => {
    handleInterest(match, false);
    handleClose();
  };

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < allUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const user = currentIndex !== null && allUsers[currentIndex];

  return (
    <>
      <div className="picture-container" onClick={() => handleCardClick(allUsers.indexOf(match))}>
          <img src={match.avatar.img} alt={match.id} />
          <div className="text-container">
            <span>{match.name}, {match.age}</span>
          </div>
      </div>
      <Modal open={modalOpen} onClose={handleClose} size='mini' centered={true}>
        <Modal.Header>
          {user ? `${user.name}, ${user.age}` : ''}
        </Modal.Header>
        {user && (
          <Modal.Content image>
            <img src={user.avatar.img} alt={user.id} />
            <Modal.Description>
              <p style={{marginLeft: '100px'}}>{user.location}</p>
              <p style={{marginLeft: '100px'}}>{user.bio}</p>
              <p style={{marginLeft: '100px'}}>{user.gender}</p>
            </Modal.Description>
          </Modal.Content>
        )}
        <Modal.Actions>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button color="black" icon="angle left" content="Prev" size="huge" onClick={handlePrevClick} />
            <Button color="red" icon="close" content="No" size="huge" onClick={handleDislikeClick} />
            <Button color="green" icon="check" content="Yes" size="huge" onClick={handleLikeClick} />
            <Button color="black" icon="angle right" content="Next" size="huge" onClick={handleNextClick} />
          </div>
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default CardComponent;
