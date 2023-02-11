import './styles/App.css';
import {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom";

import MatchedUsersPage from './MatchedUsersPage'
import ChatPage from './ChatPage'
import NavBar from './NavBar'
import SignInCreatePage from './SignInCreatePage'
import MyProfile from './MyProfile'
import Home from "./Home"
// import './styles/index.css';



function App({cable}) {
//when ready uncomment below
  const [me, setMe] = useState([])


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
  <div>
    <NavBar />
    <Routes >
    <Route path="/home" element={<Home me={me}/>} />
    <Route path="/profile" element={<MyProfile user={me} setUser={setMe} />} />
    {/*  not sure about below path*/}
    <Route path="/matches" element={<MatchedUsersPage me={me} />} />
    <Route path="/messages" element={<ChatPage me={me} cable={cable}/>} />
    <Route path="/signin" element={<SignInCreatePage user={me} setUser={setMe} />} />
    </Routes>
  </div>
 )
}

export default App;