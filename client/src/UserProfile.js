import React, {useEffect, useState} from 'react'
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { useParams } from 'react-router-dom'

function UserProfile() {

    const [user, setUser] = useState();
    const { userId } = useParams();

    useEffect(() => {
        console.log(user)
          fetch(`/users/${userId}`)
          .then(res => res.json())
          .then(userData => setUser(userData));
      }, []);
      
  return (
    <div>
        {user ?
    <MDBContainer className="py-5 h-100">
      <MDBRow className="justify-content-center align-items-center h-100">
        <MDBCol lg="9" xl="7">
          <MDBCard>
            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#2A0419', height: '200px' }}>
              <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                <MDBCardImage src={user.avatar.img} alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1' }} /> 
                 
                
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
            
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    : null }
  </div>

);
}

export default UserProfile