import './styles/App.css';
import {useEffect, useState } from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import MatchedUsersPage from './MatchedUsersPage'
import ChatPage from './ChatPage'
import NavBar from './NavBar'
import MyProfile from './MyProfile'
import Home from "./Home"
import PrivateRoute from './utils/PrivateRoute.js'
import UserProfile from './UserProfile';
import LandingPage from './LandingPage';




function App({cable}) {
  const [allUsers, setAllUsers] = useState([]);
  const [otherUsers, setOtherUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState(null);
  const [me, setMe] = useState("")
  const [showMatchMessage, setShowMatchMessage] = useState(false);



  useEffect(()=> {
    fetch('/me')
    .then(r => r.json())
    .then(data => {
      if(data.error) {
        setMe(null)
      } else {
      setMe(data)
      }
    } )
  }, [])


  useEffect(() => {
    if (me) {
      setTimeout(() => {
        let genderPreferenceQuery = me.gender_preference.map(pref => `gender_preference[]=${pref}`).join('&');
        fetch(`/users?gender=${me.gender}&${genderPreferenceQuery}`)
          .then((response) => response.json())
          .then((data) => {
            setAllUsers(data);
            const filterMe = data.filter(user => user.id !== me.id);
            setOtherUsers(filterMe);
            setIsLoading(false);
          });
          
      }, 1900);
    }
  }, [me, connectionStatus]);

  const handleClick = (user) => {
    setShowMatchMessage(true);
    fetch("/connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_id: me.id,
        recipient_id: user.id
      })
    })
      .then(response => {
        if (!response.ok) {
          setConnectionStatus('repeated')
          setTimeout(() => {
            setConnectionStatus(null);
          }, 4000);
          throw new Error("Failed to create connection")

        }
        return response.json();
      })
      .then(connection => {
        console.log("Connection created:", connection);
        setConnectionStatus(connection && connection.accepted === true ? 'true' : 'null');
        setTimeout(() => {
          setConnectionStatus(null);
          setShowMatchMessage(false);
        }, 2000);

      })
      .catch(error => {
        console.error(error);
      });
  };

  const logout = () => {
    fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }
    })
      .then(() => {
        setMe(null);
      });
  };


 return (
  <div className="app-container">
    {me ? <NavBar me={me} logout={logout}/> : null}
    <Routes >
    <Route path="*" element={<Navigate to="/signin" />} />
    <Route element={<PrivateRoute user={me} setUser={setMe}/>}>
      <Route path="/home" element={<Home me={me} setShowMatchMessage={setShowMatchMessage} handleClick={handleClick} showMatchMessage={showMatchMessage} allUsers={allUsers} connectionStatus={connectionStatus} setConnectionStatus={setConnectionStatus} otherUsers={otherUsers} isLoading={isLoading}/>} />
      <Route path="/" element={<Home />} />
      {me ? <Route path="/profile" element={<MyProfile user={me} setUser={setMe} />} /> : null }
      {me ? <Route path="/users/:userId" element={<UserProfile me={me} user={allUsers} handleClick={handleClick} setShowMatchMessage={setShowMatchMessage} showMatchMessage={showMatchMessage}/>} />: null }
      {me ? <Route path="/matches" element={<MatchedUsersPage me={me} />} /> : null }
      {me ? <Route path="/messages" element={<ChatPage me={me} cable={cable}/>} />: null }
    </Route>
    <Route path="/signin" element={<LandingPage user={me} setUser={setMe} />} />
    
    </Routes>
  </div>
 )
}

export default App;