import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useContext } from 'react';
import { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import store from '../stateManager/store';
import {LOGIN, LoginAction} from "../stateManager/store";

const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navitage = useNavigate();

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setError(false);
        // Signed in
        const user = userCredential.user;
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
  };

  return (
    <div className="formRegisterLogin">
      <img src={"money-pig.png"} className="imagine"/>
      <h5 className="center">Login</h5>
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
        <div className='center'>
        <button type="submit" className="btn green lighten-1 z-depth-0">Login</button>
        <br></br>
        {error && <span className="eroare">Email sau parola gresita!</span>}
        </div>
      </form>
    </div>
  );
};

export default Login