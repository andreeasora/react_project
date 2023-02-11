import React from "react";
import {Link} from 'react-router-dom';
import MenuLogin from "./MenuLogin";
import MenuLogout from "./MenuLogout";
import { auth } from '../config/firebase';


const Navbar = () => {
    const u = localStorage.getItem('id');
    const links = u ? <MenuLogin />:<MenuLogout />;
    return (
        <nav className="nav-wrapper green darken-1">
            <div className="container">
                <Link to='/' className="brand-logo">Money Manager</Link>
                { links }
            </div>
        </nav>
    )
}

export default Navbar