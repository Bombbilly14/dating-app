import React, { useRef, useEffect } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
} from "mdb-react-ui-kit";
import './styles/Messaging.css'
import moment from 'moment';


function Messaging({ currentUser, isLoading, matches, handleUserClick, me, messages, handleSubmit }) {

  const messagesEndRef = useRef(null);
  // use to go to newest message i.e <span> element  by referencing useRef on said element
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const otherUsers = matches
    .sort((a, b) => {
      const aLastMessageTime = a.sent_messages.length > 0
        ? new Date(a.sent_messages[a.sent_messages.length - 1].created_at).getTime()
        : 0;
      const bLastMessageTime = b.sent_messages.length > 0
        ? new Date(b.sent_messages[b.sent_messages.length - 1].created_at).getTime()
        : 0;

      return bLastMessageTime - aLastMessageTime;
    });

  

  useEffect(() => {
    if (!isLoading && otherUsers.length > 0) {
      handleUserClick(otherUsers[0].id);
 
    }
  }, [isLoading]);


 
  return (
    <MDBContainer fluid="true" className="gradient-custom messaging-container" style={{ maxWidth: '75%', marginTop: 5 }}>
      <MDBRow>
        <MDBCol md="4" lg="4" xl="4" className="user-list" >
          <div className="mask-custom">
            <div className='avatar-body'>
              <MDBTypography listUnStyled className="mb-0">
                
              {otherUsers.map((match) => {
                  const userMatch = match.recipient.id === me.id ? match.sender : match.recipient;
                  return (
                    <li key={match.id} className="p-2 border-bottom" style={{ borderBottom: "1px solid rgba(255,255,255,.3) !important" }}>
                      <a href="#!" className="d-flex justify-content-between link-light" onClick={() => handleUserClick(match.id)}>
                        <div className="d-flex flex-row">
                          <img
                            src={userMatch.avatar_url}
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                            style={{ height: "100%" }}
                          />
                          <div className="pt-1">
                            <p className="fw-bold mb-0" style={{ color: 'black' }}>{userMatch.name}</p>
                            <p className="small" style={{ color: 'black' }}>
                              {userMatch.sent_messages
                                .filter(message => message.recipient_id === me.id)
                                .pop()?.body}
                            </p>
                          </div>
                        </div>
                        <div className="pt-1">
                          <p className="small mb-1 text-white">{userMatch.time}</p>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </MDBTypography>
            </div>
          </div>
        </MDBCol>



        <MDBCol md="8" lg="8" xl="8" className='message-parent'>
          
          {currentUser && (
            <div className="current-user-info">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                 src={currentUser.recipient.id === me.id ? currentUser.sender.avatar_url : currentUser.recipient.avatar_url}
                  alt="avatar"
                  className="rounded-circle align-self-start me-3 shadow-1-strong"
                  width="60"
                  style={{ height: "100%", marginLeft: '10px' }}
                />
                <p className="fw-bold mb-0" style={{ color: 'black', marginLeft: '10px' }}>{currentUser.recipient.id === me.id ? currentUser.sender.name : currentUser.recipient.name}</p>
              </div>
            </div>
          )}

          <div className="message-container">

            <div className="message-box">
              {messages.map((message) => {

                const senderMatch = matches.find(
                  match => match.sender.id === message.sender_id || match.recipient.id === message.sender_id
                );
                const senderAvatar =
                  senderMatch.sender.id === message.sender_id
                    ? senderMatch.sender.avatar_url
                    : senderMatch.recipient.avatar_url;

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
                        <p className="message-time">
                          {moment(message.created_at).calendar(null, {
                            sameDay: '[Today at] LT',
                            lastDay: '[Yesterday at] LT',
                            lastWeek: 'MM/DD/YYYY',
                            sameElse: 'MM/DD/YYYY'
                          })}
                        </p>


                      </MDBCardBody>
                    </MDBCard>
                  </li>


                );
              })}
              <span ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="form-message">
              <div className="input-container">
                <input className="message-input" type="text" name="message" autoComplete="off" placeholder="Type your message here..." />
                <button type="submit" className="send-button">
                  Send
                </button>
              </div>
            </form>

          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}
export default Messaging