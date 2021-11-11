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

    // Change background-image function

    let i = 0;

    const slideShow = (e) => {
        const splashContainer = document.getElementsByClassName('splash-container');
        let time = 6000;

        splashContainer[0].style.backgroundImage = `url(${slideShowArr[i]})`;

        if (i < slideShowArr.length - 1) {
            i++
        } else {
            i = 0;
        }

        setTimeout(slideShow, time);
    }

    useEffect(slideShow, [])

    return (
        <div className="splash-container">
            <nav id="splash-nav" className="home-nav">
                <div onClick={redirectHome} className="formNav-logo">
                    <Logo />
                    <span className="form-logoText" id="home-logoText">Pixel</span>
                </div>
                <div className="upload-logout-container">
                    <NavLink id="login-button" to="/login">Log In</NavLink>
                    <button id="guestLogin-button" onClick={guestLogin}>Log in as guest</button>
                </div>
            </nav>
            <div id="splash-signup-container">
                <div id="slogan-container">
                    <div id="inspiration" className="slogan">Find your inspiration.</div>
                    <div id="free" className="slogan">Start for free.</div>
                </div>
                <NavLink id="signup-button" to="/signup">Sign Up</NavLink>
            </div>
            <footer className="splash-footer">
                <div id="about">About</div>
                <div className="connect">
                    <div className="connect-item" id="connect-text">Connect with the developer</div>
                    <a className="connect-item" id="email-link" href="mailto:gavin.fitch@gmail.com"><i class="fas fa-envelope"></i></a>  
                    <a className="connect-item" id="linkedin-link" href="https://www.linkedin.com/in/gavinfitch/" target="_blank"><i class="fab fa-linkedin"></i></a>
                    <a className="connect-item" id="github-link" href="https://github.com/gavinfitch/authenticate-me" target="_blank"><i class="fab fa-github"></i></a>
                </div>

            </footer>
        </div>
    )
}

export default SplashPage;