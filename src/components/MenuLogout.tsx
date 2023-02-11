import React from "react";
import {NavLink} from "react-router-dom";

const MenuLogout = () => {
    return(
        <ul className="right">
            <li><NavLink to='/login'>Login</NavLink></li>
            <li><NavLink to='/register'>Inregistreaza-te</NavLink></li>
        </ul>
    )
}

export default MenuLogout