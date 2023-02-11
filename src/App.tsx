import React, { Component, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import logo from './logo.svg';
import Navbar from './components/Navbar';
import MenuLogin from './components/MenuLogin';
import Register from './components/Register';
import Login from './components/Login';
import './App.css';
import Home from './components/Home';
import { auth } from './config/firebase';
import PrivateRoute from './PrivateRoute';
import Venituri from './components/Venituri';
import Cheltuieli from './components/Cheltuieli';
import CardC from './components/CardC';

function App() {
  const currentUser = false;
  const user = auth.currentUser?.email

  return (
    <BrowserRouter>
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/venituri" element={<Venituri/>}/>
            <Route path="/cheltuieli" element={<Cheltuieli/>}/>
            <Route path="/card" element={<CardC suma={''} obs={''} categorie={''} culoare={''}/>}/>
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
