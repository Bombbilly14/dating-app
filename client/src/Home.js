import React, { useEffect, useState } from 'react';
import './styles/Home.css';

function Home() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setAllUsers(data));
  }, []);
  

  return (
    <div className="grid-container">
      {allUsers.map((user) => (
        <div className="grid-item" key={user.id}>
          <div className="user-box">
          <p>{user.name}</p>
          <img src={user.avatar.img} alt={user.name} className="user-name" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;