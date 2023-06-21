import React from 'react';
import logonobackground from './images/logonobackground.png';

function GenderPreferenceForm({ gender, setGender, genderPreference, setGenderPreference, createAccount }) {
    const genders = ["He/Him", "She/Her", "They/Them", "Non-binary", "Other"];
  
    return (
      <form onSubmit={createAccount}>
        <div className='input-gender'>
          <label htmlFor="gender">I am...</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Pronouns</option>
            {genders.map((gender, index) => (
              <option key={index} value={gender}>{gender}</option>
            ))}
          </select>
          {gender === 'Other' && (
            <div className="input-wrapper">
              <input
                type="text"
                placeholder="Enter your gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              />
            </div>
          )}
          <img src={logonobackground} alt='Dates by Ruby Logo' className='dating-logo' />
          {/* <label>I'm interested in...</label> */}
          {genders.map((gender, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={`${gender}Preference`}
                value={gender}
                checked={genderPreference ? genderPreference.includes(gender) : false}
                onChange={(e) => {
                  if (e.target.checked) {
                    setGenderPreference(prev => [...prev, e.target.value]);
                  } else {
                    setGenderPreference(prev => prev.filter(g => g !== e.target.value));
                  }
                }}
              />
              <label htmlFor={`${gender}Preference`}>{gender}</label>
            </div>
          ))}
        </div>
        <div className="button-container">
          <input className="inputCreate" type="submit" value="Submit" />
        </div>
      </form>
    );
  }
  
  export default GenderPreferenceForm;
  