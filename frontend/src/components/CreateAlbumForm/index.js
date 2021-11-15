import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import Logo from '../Logo';

import * as albumActions from "../../store/album";

import './CreateAlbumForm.css';

function CreateAlbumForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    // Redirect home function
    const redirectHome = () => {
        history.push("/")
    };

    // Handle submit function
    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id;

        return dispatch(albumActions.thunk_addalbum({ userId, title, description }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push('/'));
    };

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <nav className="form-nav">
                <div onClick={redirectHome} id="logo-container">
                    <Logo />
                    <span className="form-logoText" id="home-logoText">Pixel</span>
                </div>
            </nav>
            <div id="createAlbum-form-background">
                <form onSubmit={handleSubmit} className="form-container" id="createAlbum-form-container">
                    <div className="form-header">
                        <Logo />
                        <div className="form-headerText">Create Album</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div className="field-container">
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button id="createAlbum-form-button" className="form-button" type="submit">Create Album</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateAlbumForm;