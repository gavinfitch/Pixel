import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



import './SplashPage.css'


import * as sessionActions from '../../store/session';
import Logo from '../Logo'



function SplashPage() {

    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();
    const history = useHistory();

    // Redirect home function
    const redirectHome = () => {
        // setFeedDisplay("Photostream");
        history.push("/");
    };

    const guestLogin = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunk_login({ credential: "acek123", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <nav className="home-nav">
                <div onClick={redirectHome} className="formNav-logo">
                    <Logo />
                    <span className="form-logoText" id="home-logoText">Pixel</span>
                </div>
                <div className="upload-logout-container">
                    <NavLink to="/login">Log In</NavLink>
                    <button id="logout-button" onClick={guestLogin}>Log in as guest</button>
                </div>
            </nav>
            <div id="splash-signup-container">
                <div>Slogan</div>
                <div id="signup-button">Sign up</div>
            </div>
            <footer className="splash-footer">
                <div>About</div>
                <div>
                    <div>Connect with the developer:</div>
                    <div>Linked in</div>
                    <div>Git hub</div>
                </div>

            </footer>
            <NavLink className="signup-button" to="/signup">Sign Up</NavLink> 
        </>
    )
}

export default SplashPage;