import React, { useState, useEffect } from 'react';
import './styles/Home.css';
import CardComponent from './CardComponent';

function Home({ me, handleClick, isLoading, otherUsers, connectionStatus, setShowMatchMessage, showMatchMessage }) {

  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(otherUsers);

  
  const applyFilters = () => {
    const filteredData = otherUsers?.filter((user) => {
      const userAge = parseInt(user.age, 10);
      const minAgeFilter = minAge ? userAge >= parseInt(minAge, 10) : true;
      const maxAgeFilter = maxAge ? userAge <= parseInt(maxAge, 10) : true;
      const locationMatch = user.location?.toLowerCase().includes(locationFilter.toLowerCase());
      const nameMatch = user.name.toLowerCase().includes(nameFilter.toLowerCase());
      return minAgeFilter && maxAgeFilter && locationMatch && nameMatch;
    });
    setFilteredUsers(filteredData);
  };

  const resetFilters = () => {
    setMinAge('');
    setMaxAge('');
    setLocationFilter('');
    setNameFilter('');
    setFilteredUsers(otherUsers);
  };
  useEffect(() => {
    if (otherUsers && otherUsers.length > 0) {
      setFilteredUsers(otherUsers);
    }
  }, [otherUsers]);

  return (
    <div className="main-container">
    <div className="home-wrapper">
      {isLoading ? (
        <div className="custom-loader-wrapper">
          <div className="custom-loader"></div>
          <h2 className="loading-text" style={{fontStyle: 'italic', color: 'white'}}>Your match, a click away</h2>
        </div>
      ) : (
        <>
        <div className="filter-section">
        <input
            type="text"
            inputMode="numeric"
            placeholder="Min Age"
            value={minAge}
            onChange={(e) => setMinAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyFilters();
              }
            }}
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Max Age"
            value={maxAge}
            onChange={(e) => setMaxAge(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyFilters();
              }
            }}
          />
          <input
            placeholder="Filter by location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyFilters();
              }
            }}
          />
          <input
            placeholder="Filter by name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                applyFilters();
              }
            }}
          />
          <button onClick={applyFilters}>Apply Filters</button>
          <button onClick={resetFilters}>Reset Filters</button>
          <hr className='separator' />
        </div>
        <div className="card-container">
        {filteredUsers?.map((filteredUser, index) => (
          <CardComponent
            key={index}
            user={filteredUser}
            me={me}
            handleClick={handleClick}
            connectionStatus={connectionStatus}
            setShowMatchMessage={setShowMatchMessage}
            showMatchMessage={showMatchMessage}
          />
        ))}
        </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Home;