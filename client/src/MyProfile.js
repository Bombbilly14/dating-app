import React, { useState } from 'react';
import './styles/Profile.css'
import 'react-image-crop/dist/ReactCrop.css';

import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


function MyProfile({ user, setUser }) {
  const [editing, setEditing] = useState(false);
  const [bio, setBio] = useState(user.bio || "")
  const [location, setLocation] = useState(user.location)
  const [age, setAge] = useState(user.age || "")
  const [avatarData, setAvatarData] = useState("")
  const [editingAvatar, setEditingAvatar] = useState(false)



  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancelClick = () => {
    setEditing(false);

  };
  const handleCancelAvatarClick = () => {
    setEditingAvatar(false);

  };
  const handleAvatarEditClick = () => {
    setEditingAvatar(true)
  }
  const handleFileChange = (event) => {
    setAvatarData(event.target.files[0])
  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    setEditing(false);

    const formData = new FormData()
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

  const handleFileSubmit = async (e) => {
    e.preventDefault();
    setEditingAvatar(false);

    const fileData = new FormData();
    fileData.append('user_id', user.id)
    fileData.append('img', avatarData)

    const response = await fetch(`/avatars/${user.avatar.id}`, {
      method: 'PATCH',
      body: fileData
    })

    const data = await response.json()
    setUser(data)


  }

  const handleDeleteClick = async () => {
    const confirmation = window.confirm('Are you sure you want to delete your account?');
    if (confirmation) {
      try {
        const response = await fetch(`/users/${user.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUser(null)

      } catch (error) {
        console.log(error);
      }
    }
  };



  return (
    <div className="profile-div">
      <MDBContainer className="py-5 h-50">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#2A0419', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  {user?.avatar ? <MDBCardImage src={user.avatar.img}
                    alt="Generic placeholder image" className="mt-4 mb-2" style={{ zIndex: '1' }} /> : null}
                  {editingAvatar || editing ? null : (
                    <div style={{ display: 'flex' }}>
                      <MDBBtn onClick={handleEditClick} outline color="dark" style={{ height: '36px', overflow: 'visible' }}>
                        Edit&nbsp;profile
                      </MDBBtn>

                      <MDBBtn onClick={handleAvatarEditClick} outline color="dark" style={{ height: '36px', overflow: 'visible', width: '1000px' }}>
                        Edit&nbsp;avatar
                      </MDBBtn>

                    </div>
                  )}

                </div>



                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText></MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="d-flex justify-content-end text-center py-1">



                </div>
              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">About</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                    <MDBCardText className="font-italic mb-1">{user.bio}</MDBCardText>
                    <MDBCardText className="font-italic mb-1">Lives in {user.location}</MDBCardText>
                    <MDBCardText className="font-italic mb-0">{user.name} is {user.age} years old</MDBCardText>
                    <MDBCardText className="font-italic mb-0">{user.gender}</MDBCardText>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">

                </div>

              </MDBCardBody>
              {editing ? (
                <>
                  <MDBCardText className="lead fw-normal mb-0" style={{ marginLeft: '10px' }} >Edit profile</MDBCardText>
                  <form onSubmit={handleSubmit} style={{ marginLeft: '10px', marginBottom: '10px' }}>
                    <label htmlFor="bio" ></label>
                    <input
                      style={{ marginBottom: '10px' }}
                      id="bio"
                      value={bio}
                      onChange={e => setBio(e.target.value)}
                      placeholder="Bio" />
                    <br />
                    <label htmlFor="location"></label>
                    <input
                      style={{ marginBottom: '10px' }}
                      id="location"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="Location" />
                    <br />
                    <label htmlFor="age"></label>
                    <select
                      id="age"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    >
                      <option value="">Select Age</option>
                      {[...Array(82)].map((_, index) => (
                        <option key={index} value={index + 18}>
                          {index + 18}
                        </option>
                      ))}
                    </select>

                    <div className="button-container">
                      <MDBBtn className="cancel-button" type="button" onClick={handleCancelClick}>
                        Cancel
                      </MDBBtn>
                      <MDBBtn type="submit" >
                        Save
                      </MDBBtn>

                    </div>
                  </form>

                </>
              ) : editingAvatar ? (
                <>
                  <MDBCardText className="lead fw-normal mb-0" style={{ marginLeft: '10px' }}>Edit Avatar</MDBCardText>
                  <form onSubmit={handleFileSubmit} style={{ marginLeft: '10px', marginBottom: '10px' }}>
                    <label htmlFor="avatar"></label>
                    <input
                      type="file"
                      accept="image/*"
                      id="avatar"

                      onChange={handleFileChange}
                    />
                    <br />
                    <MDBBtn type="button" onClick={handleCancelAvatarClick}>
                      Cancel
                    </MDBBtn>
                    <MDBBtn type="submit" >
                      Save
                    </MDBBtn>
                  </form>
                </>
              ) : (
                <div className="d-grid gap-2 mb-4">
                  <button className="btn btn-danger" onClick={handleDeleteClick}>
                    Delete account
                  </button>
                </div>
              )}
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>

  );
}

export default MyProfile;
