import './styles/App.css';
import {useEffect, useState} from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import MatchedUsersPage from './MatchedUsersPage'
import ChatPage from './ChatPage'
import NavBar from './NavBar'
import SignInCreatePage from './SignInCreatePage'
import MyProfile from './MyProfile'
import Home from "./Home"
import PrivateRoute from './utils/PrivateRoute.js'
import UserProfile from './UserProfile';
import LandingPage from './LandingPage';




function App({cable}) {

  const [me, setMe] = useState()
  


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






 return (
  <div className="app-container">
    <LandingPage />
    {/* {me ? <NavBar me={me}/> : null}
    <Routes >
    <Route path="*" element={<Navigate to="/signin" />} />
    <Route element={<PrivateRoute user={me} setUser={setMe}/>}>
    <Route path="/home" element={<Home me={me}/>} />
    <Route path="/" element={<Home me={me}/>} />
    {me ? <Route path="/profile" element={<MyProfile user={me} setUser={setMe} />} /> : null }
    {me ? <Route path="/users/:userId" element={<UserProfile me={me}/>} />: null }
    {me ? <Route path="/matches" element={<MatchedUsersPage me={me} />} /> : null }
    {me ? <Route path="/messages" element={<ChatPage me={me} cable={cable}/>} />: null }
    </Route>
    <Route path="/signin" element={<SignInCreatePage user={me} setUser={setMe} />} />
    
    </Routes> */}
  </div>
 )
}

export default App;