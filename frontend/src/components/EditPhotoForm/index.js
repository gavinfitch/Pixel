import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";

import Logo from '../Logo';

import * as photoActions from "../../store/photo";

import './EditPhotoForm.css';

function EditPhotoForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const sessionUser = useSelector((state) => state.session.user);
    const photos = useSelector((state) => state.photos);

    const { id } = useParams()
    const currentPhoto = photos[id];

    let titleString;
    if (currentPhoto?.title) {
        titleString = currentPhoto.title;
    }

    const [title, setTitle] = useState(currentPhoto?.title);
    const [description, setDescription] = useState(currentPhoto?.description);
    const [errors, setErrors] = useState([]);

    // Redirect home function
    const redirectHome = () => {
        history.push("/")
    };

    // Update photo function
    const updatePhoto = async (e) => {
        e.preventDefault();
        return dispatch(photoActions.thunk_updatephoto({ photoId: id, title, description }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push("/"));
    };

    useEffect(() => {
        const userId = sessionUser.id;
        dispatch(photoActions.thunk_getPhotosByUserId({ userId }))
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
            <div id="editPhoto-form-background">
                <form id="editPhoto-form-container">
                    <div id="editPhoto_form-header" className="form-header">
                        <Logo />
                        <div className="form-headerText">Edit {titleString || "photo"}</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div id="edit-field-container" className="field-container">
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
                        <button className="form-button" onClick={updatePhoto}>Edit</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditPhotoForm;