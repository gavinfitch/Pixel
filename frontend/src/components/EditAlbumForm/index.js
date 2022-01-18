import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import Logo from '../Logo';

import * as albumActions from "../../store/album";

import './EditAlbumForm.css';

function CreateAlbumForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const albums = useSelector((state) => state.albums);

    const { id } = useParams()
    const currentAlbum = albums[id];

    let titleString;
    if (currentAlbum?.title) {
        titleString = currentAlbum.title;
    }

    const [title, setTitle] = useState(currentAlbum?.title);
    const [description, setDescription] = useState(currentAlbum?.description);
    const [errors, setErrors] = useState([]);

    // Redirect home function
    const redirectHome = () => {
        history.push("/")
    };

    // Update album function
    const updateAlbum = async (e) => {
        e.preventDefault();
        return dispatch(albumActions.thunk_updatealbum({ albumId: id, title, description }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push('/'));
    };

    useEffect(() => {
        const userId = sessionUser.id;
        dispatch(albumActions.thunk_getAlbumsByUserId({ userId }))
    }, [dispatch])

    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <nav className="form-nav">
                <div onClick={redirectHome} id="logo-container">
                    <Logo />
                    <span className="form-logoText" id="home-logoText">Pixel</span>
                </div>
            </nav>
            <div id="editAlbum-form-background">
                <form className="form-container" id="editAlbum-form-container">
                    <div id="editAlbum_form-header" className="form-header">
                        <Logo />
                        <div className="form-headerText">Edit {titleString || "album"}</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div className="editAlbum-field-container">
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
                        <button className="form-button" onClick={updateAlbum}>Edit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateAlbumForm;