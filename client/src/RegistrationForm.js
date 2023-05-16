import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/RegistrationForm.css';

function RegistrationForm({ setUser }) {
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
      body: JSON.stringify({ name, email, password, gender, age }),
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
      <div className="container">
        {showForm && (
          <div className="content" onAnimationEnd={() => setShowForm(false)}>

            <form onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div>
                <label htmlFor="confirm-password">Confirm Password:</label>
                <input
                  type="password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm Password"
                />
              </div>
              <div>
                <label htmlFor="age">Age:</label>
                <input
                  id="age"
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="button-container">
                <input className="inputCreate" type="submit" value="Create Profile" />
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
          <div className="content">
            <form onSubmit={createAccount}>
              <div>
                <label htmlFor="gender">Gender Pronouns:</label>
                <select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Pronouns</option>
                  <option value="He/Him">He/Him</option>
                  <option value="She/Her">She/Her</option>
                  <option value="They/Them">They/Them</option>
                  <option value="Other">Other</option>
                </select>

              </div>
              <div>
                <label htmlFor="question1">Question 1:</label>
                <input
                  id="question1"
                  placeholder="Question 1"
                  value={question1}
                  onChange={(e) => setQuestion1(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="question2">Question 2:</label>
                <input
                  id="question2"
                  placeholder="Question 2"
                  value={question2}
                  onChange={(e) => setQuestion2(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="question3">Question 3:</label>
                <input
                  id="question3"
                  placeholder="Question 3"
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                />
              </div>
              <div className="button-container">
                <input className="inputCreate" type="submit" value="Submit" />
              </div>
            </form>
          </div>

        )}
      </div>
    </>
  );
}

export default RegistrationForm;