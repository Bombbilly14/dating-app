import React from 'react';
import logonobackground from './images/logonobackground.png';
import Select from 'react-select';

function GenderPreferenceForm({ gender, setGender, genderPreference, setGenderPreference, createAccount }) {
  const genders = ["He/Him", "She/Her", "They/Them", "Non-binary", "Other"];

  const genderOptions = genders.map((gender, index) => ({
    value: gender,
    label: gender
  }));

  const handleGenderPreferenceChange = (selectedOptions) => {
    setGenderPreference(selectedOptions.map(option => option.value));
  };
  const customStyles = {
    multiValue: (provided) => {
      return { ...provided, fontSize: '10px' };
    },
    multiValueLabel: (provided) => {
      return { ...provided, fontSize: '12px' };
    },
    control: (provided) => ({
      ...provided,
      width: 275,
      border: '1px solid black',
    }),
    option: (provided) => ({
      ...provided,
      color: 'black', // change the color of the text inside the input
    }),
    menu: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflow: 'auto',
    }),
  };



  return (
    <form onSubmit={createAccount}>
    <div className='input-gender'>
        <div className='input-wrapper-gender'>
            <label className='label-gender-select' htmlFor="gender">I am...</label>
            <select
                className='form-gender'
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
            >
                <option value="">Select...</option>
                {genders.map((gender, index) => (
                    <option key={index} value={gender}>{gender}</option>
                ))}
            </select>
            {gender === 'Other' && (
                <div className="input-other">
                    <input
                        type="text"
                        placeholder="Enter your gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    />
                </div>
            )}
        </div>
        <img src={logonobackground} alt='Dates by Ruby Logo' className='dating-logo' />
        <div className='input-wrapper'>
            <label className='label-gender-select' htmlFor="genderPreference">Seeking...</label>
            <Select
                isMulti
                id="genderPreference"
                options={genderOptions}
                onChange={handleGenderPreferenceChange}
                value={genderPreference.map(gender => ({ value: gender, label: gender }))}
                styles={customStyles}
            />
        </div>
    </div>
    <div className="button-container">
        <input className="inputCreate" type="submit" value="Submit" />
    </div>
</form>

  );
}

export default GenderPreferenceForm;
