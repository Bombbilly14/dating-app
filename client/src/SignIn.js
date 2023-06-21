import React from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import './styles/SignIn.css'
function SignIn({setUser}) {
    const [email, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [error, setError] = useState("")

    const login = (e) => {
        e.preventDefault()
        fetch('/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password}),
    })
    .then(r => r.json())
    .then((data) => {
      if (!data.error) {
      setUser(data)
      // localStorage.setItem('user','test')
      navigate("/profile")
      } else {
        setError(data.error)
      }
    })
    }


    return (
      <div className="login-page">
        <div className="sign-in-container">
          <h4>Welcome back!</h4>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={login}>
            <input
              id="signInName"
              value={email}
              onChange={ e => setUsername(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              id="signInPassword"
              value ={password}
              onChange={ (e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <div className="button-container">
              <input className="inputCreate" type= "submit" value="Sign In"  />
            </div>
          </form>
          <p>Not a member? <a href="">Create a profile </a></p>
        </div>
      </div>
    )
    
    
    
}

export default SignIn