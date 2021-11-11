import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';



import './SplashPage.css'


import * as sessionActions from '../../store/session';
import Logo from '../Logo'



function SplashPage() {

    const slideShowArr = [];
    slideShowArr[0] = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Slideshow+Photos/frog_photo-1.jpg"
    slideShowArr[1] = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Slideshow+Photos/man-on-boat_photo-3.jpg"
    slideShowArr[2] = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Slideshow+Photos/car_photo-4.jpg"
    slideShowArr[3] = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Slideshow+Photos/dog_photo-2.jpg"
    slideShowArr[4] = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Slideshow+Photos/harbor_photo-5.jpg"

    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();
    const history = useHistory();

    // Redirect home function
    const redirectHome = () => {
        // setFeedDisplay("Photostream");
        history.push("/");
    };

    // Guest login function
    const guestLogin = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunk_login({ credential: "acek123", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    // Background image slideshow function
    let i = 0;
    let time = 4500;

    const slideShow = () => {
        const splashContainer = document.getElementById('splash-container');
        splashContainer.style.backgroundImage = `url(${slideShowArr[i]})`;

        if (i < slideShowArr.length - 1) {
            i++
        } else {
            i = 0;
        }
    }

    useEffect(() => {
        const slideShowTimer = setInterval(slideShow, time);

        return () => clearInterval(slideShowTimer);
    }, [i])

    return (
        <div id="splash-container">
            <nav id="splash-nav" className="home-nav">
                <div onClick={redirectHome} className="formNav-logo" id="splash-logoContainer">
                    <Logo />
                    <span className="form-logoText" id="home-logoText">Pixel</span>
                </div>
                <div className="upload-logout-container">
                    <NavLink id="login-button" to="/login">Log In</NavLink>
                    <button id="guestLogin-button" className="splash-button" onClick={guestLogin}>Log in as guest</button>
                    <NavLink id="nav-signup" className="signup-button splash-button" to="/signup">Sign up</NavLink>
                </div>
            </nav>
            <div id="splash-signup-container">
                <div id="slogan-container">
                    <div id="inspiration" className="slogan">Find your inspiration.</div>
                    <div id="free" className="slogan">Join the Pixel community, home to three seeder files and one guest account.</div>
                </div>
                <NavLink id="center-signup" className="signup-button splash-button" to="/signup">Start for free</NavLink>
            </div>
            <footer className="splash-footer">
                <div className="connect">
                    <div className="connect-item" id="connect-text">Connect with the developer</div>
                    <a className="connect-item connect-icon" id="email-link" href="mailto:gavin.fitch@gmail.com"><i class="fas fa-envelope"></i></a>
                    <a className="connect-item connect-icon" id="linkedin-link" href="https://www.linkedin.com/in/gavinfitch/" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a className="connect-item connect-icon" id="github-link" href="https://github.com/gavinfitch/authenticate-me" target="_blank"><i class="fab fa-github"></i></a>
                </div>

            </footer>
        </div>
    )
}

export default SplashPage;