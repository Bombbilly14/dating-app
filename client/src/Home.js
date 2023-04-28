import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './tailwind.css'
import CardComponent from './CardComponent';



function Home({me}) {
  const [allUsers, setAllUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [originalUsers, setOriginalUsers] = useState([]);
  const [selectedAgeRange, setSelectedAgeRange] = useState('');



  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setAllUsers(data));
  }, []);

  const filterUsersByAge = (ageRange) => {
    const originalUsers = allUsers.slice(); // make a copy of the original array
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
    });
    setAllUsers(filteredUsers);
  }
  const handleAgeRangeChange = (event) => {
    setSelectedAgeRange(event.target.value);
    filterUsersByAge(event.target.value);
  }
  

  const filterMe = allUsers.filter(user => user.id !== me.id);
  
  return (
    <div>
      {/* <div className="dropdown">
        <label htmlFor="age-range-select">Filter users by age range:</label>
        <select id="age-range-select" value={selectedAgeRange} onChange={handleAgeRangeChange}>
          <option value="">All ages</option>
          <option value="18+">18+</option>
          <option value="25+">25+</option>
          <option value="35+">35+</option>
        </select>
      </div> */}
      <div className="card-container">
        {filterMe.map((match, index) => (
            <CardComponent match={match} key={index} me={me}/>
        ))}
      </div>
    </div>
  )
}

export default Home;