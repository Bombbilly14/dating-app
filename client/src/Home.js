import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './tailwind.css'
import CardComponent from './CardComponent';



function Home({me}) {
  const [allUsers, setAllUsers] = useState([]);




  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setAllUsers(data));
  }, []);
  

  const otherUsers = allUsers.filter(user => user.id !== me.id);
  return (
    <div className="card-container">
        {otherUsers.map((match, index) => (
            <CardComponent match={match} key={index} me={me}/>
        ))}
    </div>
  )
}

export default Home;