import React from 'react'
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

function Messaging({message, matches}) {
    //const recipient = matches.find(match => match.id === recipientId);
          // const recipientName = recipient ? recipient.name : null;
          // const userName = message.sender_id === user.id ? "You" : recipientName
          // console.log(message)
          // return <div className="messages" key={message.body}>
          //   <p>{userName}: {message.body}</p>
          //    </div>
  return (
    <div style={{ position: "relative", height: "500px" }}>
  <MainContainer>
    <ChatContainer>
      <MessageList>
        <Message
          model={{
            message: "Hello my friend",
            sentTime: "just now",
            sender: "Joe",
          }}
        />
      </MessageList>
      <MessageInput placeholder="Type message here" />
    </ChatContainer>
  </MainContainer>
</div>
  )
}

export default Messaging