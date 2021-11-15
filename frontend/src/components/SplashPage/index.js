import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';

import Logo from '../Logo'

import * as sessionActions from '../../store/session';

import './SplashPage.css'

function SplashPage() {

    const slideShowArr = [];
    slideShowArr[0] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Desert.jpg";
    slideShowArr[1] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Reflection.jpg";
    slideShowArr[2] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Frog.jpg";
    slideShowArr[3] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Car.jpg";
    slideShowArr[4] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Snowy-mountains.jpg";
    slideShowArr[5] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Power-plant.jpg";
    slideShowArr[6] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Sheep.jpg";
    slideShowArr[7] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Cottage.jpg";
    slideShowArr[8] = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Beach.jpg";

    const [errors, setErrors] = useState(null)
    const dispatch = useDispatch();
    const history = useHistory();

    // Redirect home function
    const redirectHome = () => {
        history.push("/");
    };

    // Guest login function
    const guestLogin = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunk_login({ credential: "guest", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    // Background image slideshow function
    let i = 0;
    let time = 5000;

    const slideShow = () => {
        const splashContainer = document.getElementById('splash-container');
        splashContainer.style.backgroundImage = `url(${slideShowArr[i]})`;

        if (i < slideShowArr.length - 1) {
            i++
        } else {
            i = 0;
        }
    }

    let imagesLoaded = false;

    Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then((res) => {
        imagesLoaded = true;
    });

    useEffect(() => {

        if (imagesLoaded = true) {
            const slideShowTimer = setInterval(slideShow, time);

            return () => clearInterval(slideShowTimer);
        }

    }, [imagesLoaded])

    return (
        <div id="splash-container">
            <div id="imgCache">
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Desert.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Reflection.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Frog.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Car.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Snowy-mountains.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Power-plant.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Sheep.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Cottage.jpg"></img>
                <img src="https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Beach.jpg"></img>
            </div>
            <nav id="splash-nav" className="home-nav">
                <div onClick={redirectHome} id="logo-container">
                    <Logo />
                    <div className="form-logoText" id="home-logoText">Pixel</div>
                </div>
                <div className="upload-logout-container">
                    <NavLink id="login-button" to="/login">Log in</NavLink>
                    <button id="guestLogin-button" className="splash-button" onClick={guestLogin}>Log in as guest</button>
                    <NavLink id="nav-signup" className="signup-button splash-button" to="/signup">Sign up</NavLink>
                </div>
            </nav>

            <div id="splash-signup-container">
                <div id="slogan-container">
                    <div id="inspiration" className="slogan">Find your inspiration.</div>
                    <div id="join" className="slogan">Join the Pixel community.</div>
                </div>
                <NavLink id="startForFree" className="signup-button splash-button" to="/signup">Start for free</NavLink>
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