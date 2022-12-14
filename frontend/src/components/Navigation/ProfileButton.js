import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../stroe/session';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        }

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(logoutUser());
    }

    return (
        <div>
            <button onClick={openMenu}>
                <i class="fa-solid fa-user-circle"></i>
            </button>
            {showMenu && (
                <ul className="profile-dropdown">
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                </ul>
            )}
        </div>
    )

}

export default ProfileButton;