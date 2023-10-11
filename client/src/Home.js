import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import CardComponent from './CardComponent';

function Home({ me }) {
  const [allUsers, setAllUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [showMatchMessage, setShowMatchMessage] = useState(false);

  useEffect(() => {
    if (me) {
      setTimeout(() => {
        let genderPreferenceQuery = me.gender_preference.map(pref => `gender_preference[]=${pref}`).join('&');
        fetch(`/users?gender=${me.gender}&${genderPreferenceQuery}`)
          .then((response) => response.json())
          .then((data) => {
            setAllUsers(data);
            const filterMe = data.filter(user => user.id !== me.id);
            setOtherUsers(filterMe);
            setIsLoading(false);
          });
      }, 1900);
    }
  }, [me, connectionStatus]);

  const handleClick = (user) => {
    setShowMatchMessage(true);
    fetch("/connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_id: me.id,
        recipient_id: user.id
      })
    })
      .then(response => {
        if (!response.ok) {
          setConnectionStatus('repeated')
          setTimeout(() => {
            setConnectionStatus(null);
          }, 4000);
          throw new Error("Failed to create connection")

        }
        return response.json();
      })
      .then(connection => {
        console.log("Connection created:", connection);
        setConnectionStatus(connection && connection.accepted === true ? 'true' : 'null');
        setTimeout(() => {
          setConnectionStatus(null);
          setShowMatchMessage(false); // Hide the match message after 4 seconds
        }, 2000);

      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="main-container">
    <div className="home-wrapper">
      {isLoading ? (
        <div className="custom-loader-wrapper">
          <div className="custom-loader"></div>
          <h2 className="loading-text" style={{fontStyle: 'italic', color: 'white'}}>Your match, a click away</h2>
        </div>
      ) : (
        <div className="card-container">
          {otherUsers.map((user, index) => (
            <CardComponent key={index} user={user} me={me} handleClick={handleClick} connectionStatus={connectionStatus} setShowMatchMessage={setShowMatchMessage} showMatchMessage={showMatchMessage} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;