import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';

import ProfileButton from '../Navigation/ProfileButton';
import Logo from '../Logo';
import './Home.css';

function Home({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const history = useHistory();
    const dispatch = useDispatch();

    // Redirect home function
    const redirectHome = () => {
        history.push("/")
    };

    // Logout function
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunk_logout());
    };

    if (sessionUser) {
        return (
            <>
                <nav className="form-nav">
                    <div onClick={redirectHome} className="formNav-logo">
                        <Logo />
                        <span className="form-logoText">Pixel</span>
                    </div>
                    <NavLink to='/photos/new'><i class="fas fa-cloud-upload-alt"></i></NavLink>
                    <button onClick={logout}>Log out</button>
                </nav>
            </>
        );
    }

    else {
        return (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }
}

export default Home;