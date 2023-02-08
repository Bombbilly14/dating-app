import React from 'react'
import {useState} from 'react'
import { useNavigate } from "react-router-dom";

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
    <div className="sign-in-form">

    <>
    {error && <p className="error-message">{error}</p>}
    <form onSubmit={login}>
        <label htmlFor="signInName"></label>
        <input
        id="signInName"
        value={email}
        onChange={ e => setUsername(e.target.value)}
        placeholder="Email"/>
        
        <br />
        <label htmlFor="signInPassword"></label>
        <input
        type="password"
        id="signInPassword"
        value ={password}
        onChange={ (e) => setPassword(e.target.value)}
        placeholder="Password"
         />
         <br/>
         <div className="button-container">
        <input className="inputCreate"type= "submit" value="Sign In"  />
        </div>
    </form>
    </>


    </div>
  )
}

export default SignIn