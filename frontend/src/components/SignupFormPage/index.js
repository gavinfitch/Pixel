import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';
import Logo from '../Logo';

function SignupFormPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.thunk_signup({ firstName, lastName, username, email, password }))
                .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors) setErrors(data.errors);
                });
        }
        return setErrors(['Confirm password field must be the same as password field.']);
    };

    return (
        <>
            <nav className="form-nav">
                <a href="/" id="logo-container">
                    <Logo />
                    <div className="form-logoText" id="home-logoText">Pixel</div>
                </a>
            </nav>
            <div className="form-background">
                <form onSubmit={handleSubmit} id="signup-form-container">
                    <div className="form-header">
                        {/* <div className="logo">
                            <div id="logo-yellow"></div>
                            <div id="logo-red"></div>
                            <div id="logo-blue"></div>
                        </div> */}
                        <Logo />
                        <div className="form-headerText">Sign up for Pixel</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div id="signup-field-container">
                        <input
                            className="form-field"
                            type="text"
                            placeholder="First name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Last name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        // required
                        />
                        <input
                            className="form-field"
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        // required
                        />
                        <button id="signup-form-button" type="submit">Sign up</button>
                    </div>

                    <div id="signup-redirect-container">
                        <span className="redirect-text">Already a Pixel member? </span>
                        <NavLink className="redirect-link" to="/login">Log in here.</NavLink>
                    </div>
                </form>
            </div>
        </>
    );
}

export default SignupFormPage;