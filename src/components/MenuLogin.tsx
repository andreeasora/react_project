import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../config/firebase';

const MenuLogin = () => {
  const u = localStorage.getItem('email');
  const navitage = useNavigate();

  const logout = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
      localStorage.removeItem("email");
      localStorage.removeItem("id");
      navitage("/")
      console.log('Signed Out');
      window.location.reload();
  };
  return (
    <div>
      <ul className="right">
      <li><NavLink to='/home'>Acasa</NavLink></li>
        <li><NavLink to='/cheltuieli'>Cheltuieli</NavLink></li>
        <li><NavLink to='/venituri'>Venituri</NavLink></li>
        <li><NavLink to='/' onClick={logout}>Logout</NavLink></li>
        <li> &nbsp;&nbsp;Cont: {u}</li>
      </ul>
    </div>
  )
}

export default MenuLogin