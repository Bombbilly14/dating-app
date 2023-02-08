import React, { useState } from 'react';
import './styles/Profile.css'


function MyProfile({ user , setUser, onUpdateUser}) {
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({...user})

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);
    
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditing(false);
  
    try {
      const response = await fetch(`/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      setUser({...updatedUser})


    } catch (error) {
      console.log(error);
    }
  };
  

  const handleInputChange = (event) => {
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1 className="profile-name">{user.name}</h1>
        {!editing && (
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        )}
      </div>
      {editing ? (
        <>
        <form onSubmit={handleSubmit}>

            
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={updatedUser.bio}
              onChange={handleInputChange}/>
            
         
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              name="location"
              type="text"
              value={updatedUser.location}
              onChange={handleInputChange}
            />
         
         
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              name="age"
              type="number"
              value={updatedUser.age}
              onChange={handleInputChange}
            />

            <button className="cancel-button" type="button" onClick={handleCancelClick}>
              Cancel
            </button>
            <button type="submit" >
              Save
            </button>
        </form>
        </>
      ) : (
        <div className="profile-info">
          <p>
            <span className="info-label">Bio:</span> {user.bio}
          </p>
          <p>
            <span className="info-label">Location:</span> {user.location}
          </p>
          <p>
            <span className="info-label">Age:</span> {user.age}
          </p>
        </div>
      )}
    </div>
  );
}

export default MyProfile;
