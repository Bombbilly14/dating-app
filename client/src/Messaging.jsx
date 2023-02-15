import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBInput,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import './styles/Messaging.css'

function Messaging({matches, handleUserClick, me, messages, handleSubmit}) {
  
 
          return (
            <MDBContainer fluid className="py-5 gradient-custom">
              <MDBRow>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                  <h5 className="font-weight-bold mb-3 text-center text-white">
                    Users
                  </h5>
        
                  <MDBCard className="mask-custom">
                    <MDBCardBody>
                      <MDBTypography listUnStyled className="mb-0">
                      {matches.map((match) => (
                        
                        
                         <li
                            key={match.id}
                            className="p-2 border-bottom"
                            style={{
                             borderBottom: "1px solid rgba(255,255,255,.3) !important",
                           }}
                          >
                            <a
                             href="#!"
                             className="d-flex justify-content-between link-light"
                              onClick={() => handleUserClick(match.id)}
                           >
                             <div className="d-flex flex-row">
                               <img
                                  src={match.avatar.img}
                                  alt="avatar"
                                  className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                  width="60"
                                />
                               <div className="pt-1">
                                  <p className="fw-bold mb-0" style={{color: 'black'}}>{match.name}</p>
                                  <p className="small text-white">
                                    {match.sent_messages
                                      .filter(message => message.recipient_id == me.id)
                                        .pop()?.body}
                                 </p>
                               </div>
                             </div>
                              <div className="pt-1">
                               <p className="small mb-1 text-white">{match.time}</p>
                                {/* <span className="badge bg-danger float-end">{match.notifications}</span> */}
                             </div>
                           </a>
                         </li>
                       ))}
                      </MDBTypography>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>



                <MDBCol md="6" lg="7" xl="8">
  <MDBTypography listUnStyled className="text-white">
    {messages.map((message) => {
      
      const recipient = matches.find(match => match.id === message.recipient_id);
      const recipientName = recipient ? recipient.name : null;
      const userName = message.sender_id === me.id ? "You" : recipientName;
      console.log(recipient)
      return (
        <li className="d-flex justify-content-between mb-4" key={message.id}>
          {userName === "You" ? (
            <img
              src={me.avatar.img}
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
          ) : (
            <img
              src={recipient.avatar.img}
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width="60"
            />
          )}
          <MDBCard className="mask-custom">
            <MDBCardHeader
              className="d-flex justify-content-between p-3"
              style={{ borderBottom: "1px solid rgba(255,255,255,.3)" }}
            >
              <p className="fw-bold mb-0" style={{color: 'black'}}>{userName}</p>
              <p className="text-light small mb-0">
                {/* <MDBIcon far icon="clock" /> {message.created_at} */}
              </p>
            </MDBCardHeader>
            <MDBCardBody size='lg'>
              <p className="mb-0" style={{color: 'black'}}>{message.body}</p>
            </MDBCardBody>
          </MDBCard>
        
        </li>
      );
    })}
    
          <form onSubmit={handleSubmit}>
            <MDBInput className="Message-input" type="text" name="message" size="lg" />
            <MDBBtn  type="submit">
              Send
            </MDBBtn>
          </form>
  </MDBTypography>
</MDBCol>
        
               
              </MDBRow>
            </MDBContainer>
          );
        }
export default Messaging