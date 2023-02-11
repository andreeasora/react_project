import { createUserWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { onSnapshot, collection, setDoc, doc} from 'firebase/firestore';
import store from '../stateManager/store';
import {LOGIN, LoginAction} from "../stateManager/store";

const Register = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");

  const navitage = useNavigate()

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if(email == '' || password == '' || lastName == '' || firstName == ''){
      setError(true);
    }
    else{
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        setError(false);
        // Signed in
        const user = userCredential.user;
       await setDoc(doc(db, "users", user.uid), {
        email: email,
        nume: lastName,
        prenume: firstName
      });
        navitage("/home")
        localStorage.setItem('email', email)
        localStorage.setItem('id', user.uid);
        window.location.reload();
        const action: LoginAction = {
          type: LOGIN,
          payload: {
            email:email,
          },
        };
        store.dispatch(action);
      })
      .catch((error) => {
        setError(true);
      });
    }
  };

  return (
    <div className="formRegisterLogin">
      <img src={"money-pig.png"} className="imagine"/>
      <h5 className="center">Inregistrare</h5>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parola"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nume"
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Prenume"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <div className='center'>
        <button type="submit" className="btn green lighten-1 z-depth-0">Inregistreaza-te</button>
        <br></br>
        {error == true? <p>Va rugam completati toate datele!</p>:<p></p>}
        </div>
      </form>
    </div>
  );
};

export default Register;

