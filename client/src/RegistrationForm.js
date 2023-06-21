import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GenderPreferenceForm from './GenderPreferenceForm';
import './styles/RegistrationForm.css';
import logoNoback from './images/logonobackground.png';

function RegistrationForm({ setUser, closeForm }) {
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [showTitle, setShowTitle] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');
  const [question3, setQuestion3] = useState('');
  const [gender, setGender] = useState('');
  const [genderPreference, setGenderPreference] = useState([]);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setShowTitle(true);
  };

  const createAccount = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return
    }
    //@@test
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMessage('Password must be at least 8 characters long, contain at least one letter and one number');
      return
    }
    fetch('/users', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, gender, age, gender_preference: genderPreference }),
    })
      .then(r => r.json())
      .then((data) => {
        if (data.error) {
          setUser(null)
        } else {
          setUser(data)
          navigate("/profile")
        }
      })
  }
  return (
    <>
      {message && <p>{message}</p>}
      <div className="registration-container">
        {showForm && (
          <div className="registration-content" onAnimationEnd={() => setShowForm(false)}>
            <button className="inputBack" onClick={closeForm}>X</button>
            <form onSubmit={handleFormSubmit}>
              <div className="input-wrapper">
                <h4 style={{ textAlign: 'center' }}>Start Free Today!</h4>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="age">Age:</label>
                <select
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                >
                  {[...Array(82)].map((e, i) =>
                    <option key={i + 18} value={i + 18}>{i + 18}</option>
                  )}
                </select>
              </div>
              <div className="button-container">
                <input className="inputCreate" type="submit" value="Next" />
                <hr></hr>

              </div>
            </form>
          </div>
        )}
        {showTitle && (
          <h2
            className="title content"
            onAnimationEnd={() => {
              setShowTitle(false);
              setShowQuestions(true);
            }}
          >
            A few questions about yourself
          </h2>
        )}
        {showQuestions && (
          <div className="registration-content">
            <GenderPreferenceForm
              gender={gender}
              setGender={setGender}
              genderPreference={genderPreference}
              setGenderPreference={setGenderPreference}
              createAccount={createAccount}
            />
          </div>

        )}
      </div>
    </>
  );
}

export default RegistrationForm;