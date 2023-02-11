import { Outlet, Navigate } from 'react-router-dom'
import { auth } from './config/firebase'

const PrivateRoute = () => {
    let auth_email = localStorage.getItem('email')
    return(
        auth_email ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoute