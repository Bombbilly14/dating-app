import React, { useState, useEffect } from 'react';
import './styles/Profile.css'



function MyProfile({ user , setUser}) {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [age, setAge] = useState("")
  const [avatarData, setAvatarData] = useState(null)
  const [avatar, setAvatar] = useState("")
  


  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);

  };
  const handleFileChange = (event) => {
    setAvatarData(event.target.files[0]);
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditing(false);

    const formData =  new FormData()
    formData.append('bio', bio)
    formData.append('location', location)
    formData.append('age', age)




    try {
     
      const response = await fetch(`/users/${user.id}`, {
        method: "PATCH",
        body: formData
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const updatedUser = await response.json();
      setUser(updatedUser);

    } catch (error) {
      console.log(error);
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    setEditing(false);

    const fileData = new FormData();
    fileData.append('user_id', user.id)
    fileData.append('img', avatarData)

    fetch(`/avatars/${user.avatar.id}`, {
      method: 'PATCH',
      body: fileData
    })
    

  }





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
             <label htmlFor="bio"></label>
           <input
             id="bio"
             value={bio}
             onChange={ e => setBio(e.target.value)}
             placeholder="Bio"/>
             <br />
             <label htmlFor="location"></label>
             <input
              id="location"
              value={location}
              onChange={ e => setLocation(e.target.value)}
              placeholder="Location"/>
             <br />
             <label htmlFor="age"></label>
             <input
              type="number"
              id="age"
              value ={age}
              onChange={ (e) => setAge(e.target.value)}
              placeholder="age"
              />
            <br />

            <div className="button-container">
              <button className="cancel-button" type="button" onClick={handleCancelClick}>
                Cancel
              </button>
              <button type="submit" >
                Save
              </button>

            </div>
          </form>
          <form onSubmit={handleFileSubmit}>
            <label htmlFor="avatar"></label>
            <input
            type="file"
            accept="image/*"
            id="avatar"
            onChange={handleFileChange}
            />
            <br />
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
      {/* {user ? <img src={user.avatar.img} key={user.id} className="user-name" /> : null} */}
    </div>
  );
}

export default MyProfile;
