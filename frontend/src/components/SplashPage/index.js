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
                    <NavLink to="/login">Log In</NavLink>
                    <button id="logout-button" onClick={guestLogin}>Log in as guest</button>
                </div>
            </nav>
            <div id="splash-signup-container">
                <div>Slogan</div>
                <div onClick={slideShow} id="signup-button">Sign up</div>
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
        </div>
    )
}

export default SplashPage;