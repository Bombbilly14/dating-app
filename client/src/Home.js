import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import './tailwind.css'
import CardComponent from './CardComponent';



function Home({me}) {
  const [allUsers, setAllUsers] = useState([]);
// this works but doesnt change accepted to true, stays nil
  const handleClick = (match) => {
    fetch("/connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_id: me.id,
        recipient_id: match.id
      })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to create connection");
        }
        return response.json();
      })
      .then(connection => {
        console.log("Connection created:", connection);
      })
      .catch(error => {
        console.error(error);
      });
  };
// const handleClick = (match) => {
//     let url = "/connections";
//     let method = "POST";
//     let connectionData = {
//       sender_id: me.id,
//       recipient_id: match.id
//     };
//     if (match.connection) {
//       url = `/connections/${match.connection.id}`;
//       method = "PUT";
//       connectionData = {
//         ...connectionData,
//         accepted: true
//       };
//     }
//     fetch(url, {
//       method: method,
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(connectionData)
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error("Failed to update connection");
//         }
//         return response.json();
//       })
//       .then(connection => {
//         console.log("Connection updated:", connection);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

  useEffect(() => {
    fetch('/users')
      .then((response) => response.json())
      .then((data) => setAllUsers(data));
  }, []);
  


  return (
    <div className="card-container">
        {allUsers.map((match, index) => (
            <CardComponent match={match} key={index} handleClick={() => handleClick(match)}/>
        ))}
    </div>
  )
}

export default Home;