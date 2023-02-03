// import React, { useState, useEffect } from "react";
// import MessagesPage from './MessagesPage'
// import './styles/Form.css'

// const ChatRoom = ({me}) => {
//   const [recipientId, setRecipientId] = useState(null);
//   const [users, setUsers] = useState([])

//   useEffect(() => {

//     fetch("/users")
//       .then((res) => res.json())
//       .then((data) => {
//         setUsers(data);
//       });
//   }, []);

//   const handleUserClick = (id) => {
//     setRecipientId(id);
//   };

//   return (
//     <div className="chat-room">
//       <div className="users-list">
//         {users.map((user) => (
//           <div
//             key={user.id}
//             onClick={() => handleUserClick(user.id)}
//             className="user"
//           >
//             {user.name}
//           </div>
//         ))}
//       </div>
//       {recipientId && <MessagesPage recipientId={recipientId} />}
//     </div>
//   );
// };

// export default ChatRoom;