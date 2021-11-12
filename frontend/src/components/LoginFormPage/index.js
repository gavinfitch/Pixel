import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, NavLink } from 'react-router-dom';
import './LoginForm.css';
import Logo from '../Logo';

function LoginFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunk_login({ credential, password }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    return (
        <>
            <nav className="form-nav">
                <a href="/" id="logo-container">
                    <Logo />
                    <div className="form-logoText" id="home-logoText">Pixel</div>
                </a>
            </nav>
            <div className="form-background">
                <form onSubmit={handleSubmit} className="form-container" id="login-form-container">
                    <div className="form-header">
                        {/* <div className="logo">
                            <div id="logo-yellow"></div>
                            <div id="logo-red"></div>
                            <div id="logo-blue"></div>
                        </div> */}
                        <Logo />
                        <div className="form-headerText">Log in to Pixel</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div id="login-field-container">
                        <input
                            className="form-field"
                            placeholder="Username or email"
                            type="text"
                            value={credential}
                            onChange={(e) => setCredential(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        // required
                        />
                        <button className="form-button" type="submit">Log in</button>
                    </div>

                    <div className="redirect-container">
                        <span className="redirect-text">Don't have an account? </span>
                        <NavLink className="redirect-link" to="/signup">Sign up here.</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
}

export default LoginFormPage;