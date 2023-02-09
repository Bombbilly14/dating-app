import './styles/App.css';
import {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom";

import ChatPage from './ChatPage'
import NavBar from './NavBar'
import SignInCreatePage from './SignInCreatePage'
import MyProfile from './MyProfile'
import Home from "./Home"


function App() {
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


  const handleUpdateUser = updatedUser => {
    setMe(updatedUser);
  };



 return (
  <div>
    <NavBar />
    <Routes >
    <Route path="/home" element={<Home/>} />
    <Route path="/profile" element={<MyProfile user={me} setUser={setMe}  onUpdateUser={handleUpdateUser}/>} />
    {/*  not sure about below path*/}
    {/* <Route path="/users/:username" element={<ProfilePage />} /> */}
    <Route path="/messages" element={<ChatPage me={me}/>} />
    <Route path="/signin" element={<SignInCreatePage user={me} setUser={setMe}/>} />
    </Routes>
  </div>
 )
}

export default App;