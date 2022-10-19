import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from './ProfileButton'
import './Navigation.css'

function Navigation() {
    const sessionUser = useSelector(state => state.session.user)

    let sessionLinks;

    if (sessionUser) {
        sessionLinks = (
            <ProfileButton user={sessionUser} />
        )
    } else {
        sessionLinks = (
            <div>
                <NavLink to='/login' className='auth-link'>Log In</NavLink>
                <NavLink to='/signup' className='auth-link'>Sign Up</NavLink>
            </div>
        )
    }

    return (
        <div className="nav-container">
            <NavLink to='/'>Taut</NavLink> 
            {sessionLinks}
        </div>
    )
}

export default Navigation;