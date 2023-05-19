import React from 'react'
import {useState} from 'react'
import RegistrationForm from './RegistrationForm'
import SignIn from "./SignIn.js"
import Modal from 'react-modal';
import "./styles/Form.css"
// import DiamondIcon from '@mui/icons-material/Diamond';


Modal.setAppElement('#root')

function SignInCreatePage({user, setUser}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);
 
    const logout = () => {
      fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"

      }
    })
    .then (() => {
      setUser(null)
    })
    }

    return (
      <div>
         <div>
           <div>
           <header>
           
       {/* <DiamondIcon className="h2-loop" sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'red' }} /> */}
       <h2 className="h2-loop">Dates With Ruby </h2>
       
       
       </header>
           </div>
        <div className="modalParent">

        {user ? <button className="button-create" onClick={logout}>Logout</button> : null}
        <h1 className="sign-in-h1" style={{color: 'white'}}> {user ? null : 'Please Sign-in'}</h1>
        {user === null ? (
          <>
            <SignIn setUser={setUser} />
            <br/>
            <button className="button-create" onClick={openModal}>Create Profile</button>
            <Modal alt="modal waddup" className={modalIsOpen ? "isOpen" : "isClosed"} isOpen={modalIsOpen} onRequestClose={closeModal} >
              <div className="modal-header">
                <h2>Create Profile</h2>
                <button className="close-button" onClick={closeModal}>X</button>
              </div>
              <RegistrationForm setUser={setUser} />
              
            </Modal>
          </>
        ) : null}
          </div>
        </div>
      </div>
    );
}

export default SignInCreatePage
