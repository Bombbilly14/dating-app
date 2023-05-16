import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBTypography,
  MDBInput,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import './styles/Messaging.css'

function Messaging({ matches, handleUserClick, me, messages, handleSubmit }) {

  const otherUsers = matches.filter(user => user.id !== me.id);
  return (
    <MDBContainer fluid="true" className="py-5 gradient-custom" style={{ maxWidth: '90%', marginLeft: 10, }}>
      <MDBRow>
        <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0" >
          {/* <h5 className="font-weight-bold mb-3 text-center text-white">
            Users
          </h5> */}

          <MDBCard className="mask-custom">
            <MDBCardBody className='card-body'>
              <MDBTypography listUnStyled className="mb-0">
                {otherUsers.map((match) => (
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
                          style={{ height: "100%", }}
                        />
                        <div className="pt-1">
                          <p className="fw-bold mb-0" style={{ color: 'black' }}>{match.name}</p>
                          <p className="small" style={{ color: 'black' }}>
                            {match.sent_messages
                              .filter(message => message.recipient_id === me.id)
                              .pop()?.body}
                          </p>
                        </div>
                      </div>
                      <div className="pt-1">
                        <p className="small mb-1 text-white">{match.time}</p>

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

              const sender = matches.find(match => match.id === message.sender_id);
              const recipient = matches.find(match => match.id === message.recipient_id);
              const senderName = sender ? sender.name : null;
              const senderAvatar = sender ? sender.avatar.img : null;
              const recipientName = recipient ? recipient.name : null;

              const user = message.sender_id === me.id ? "You" :
                message.sender_id === recipient.id ? recipientName : senderName;
              return (
                <li key={message.id} className={message.sender_id === me.id ? "my-message" : "other-message"}>
  {message.sender_id !== me.id && (
    <img
      src={senderAvatar}
      alt="avatar"
      className="rounded-circle align-self-start me-3 shadow-1-strong avatar"
      width="60"
    />
  )}
  <MDBCard className="mask-custom message-card">
    <MDBCardBody size='lg'>
      <p className="mb-0 message-text">{message.body}</p>
    </MDBCardBody>
  </MDBCard>
</li>


              );
            })}

            <form onSubmit={handleSubmit}>
              <MDBInput className="Message-input" type="text" name="message" size="lg" />
              <MDBBtn type="submit">
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