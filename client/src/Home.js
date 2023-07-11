import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import CardComponent from './CardComponent';

function Home({ me }) {
  const [allUsers, setAllUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  // const [selectedAgeRange, setSelectedAgeRange] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (me) {
      setTimeout(() => {
        fetch('/users')
          .then((response) => response.json())
          .then((data) => {
            setAllUsers(data);
            const filterMe = data.filter(user => user.id !== me.id);
            setOtherUsers(filterMe);
            setIsLoading(false);
          });
      }, 1900);
    }
  }, [me]);




  const filterUsersByAge = (ageRange) => {
    const originalUsers = allUsers.slice();
    const filteredUsers = originalUsers.filter(user => {
      const userAge = Number(user.age);
      console.log('userAge:', userAge, 'ageRange:', ageRange);
      switch (ageRange) {
        case '18+':
          return userAge >= 18;
        case '25+':
          return userAge >= 25;
        case '35+':
          return userAge >= 35;
        default:
          return true;
      }
    }).filter(user => user.id !== me.id);;
    setAllUsers(filteredUsers);
  }

  // const handleAgeRangeChange = (event) => {
  //   setSelectedAgeRange(event.target.value);
  //   filterUsersByAge(event.target.value);
  // }

  const handleInterest = (match, interested) => {
    // send interest or decline match based on button click
    console.log(`Match ${match.id} was ${interested ? 'liked' : 'disliked'}.`);
    //send a request to the server to indicate interest or decline
  };

  return (
    <div className="main-container">
    <div className="home-wrapper">
      {isLoading ? (
        <div className="custom-loader-wrapper">
          <div className="custom-loader"></div>
          <h2 className="loading-text" style={{fontStyle: 'italic'}}>Your match, a click away</h2>
        </div>
      ) : (
        <div className="card-container">
          {otherUsers.map((user, index) => (
            <CardComponent key={index} user={user} me={me} handleInterest={handleInterest} />
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Home;