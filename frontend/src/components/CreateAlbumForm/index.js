import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as albumActions from "../../store/album";
import './CreateAlbumForm.css';
import Logo from '../Logo';

function CreateAlbumForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);

    const config = {
        bucketName: 'pixelphotostorage',
        region: 'us-west-2',
        accessKeyId: 'AKIAQ5HCEL66DJMSJ66K',
        secretAccessKey: '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',
    }

    const ReactS3Client = new S3(config);

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id;

        // console.log("YOU ARE IN THE HANDLER", userId, title, description)

        return dispatch(albumActions.thunk_addalbum({ userId, title, description }))

        // if (password === confirmPassword) {
        //     setErrors([]);
        //     return dispatch(sessionActions.thunk_signup({ firstName, lastName, username, email, password }))
        //         .catch(async (res) => {
        //             const data = await res.json();
        //             if (data && data.errors) setErrors(data.errors);
        //         });
        // }
        // return setErrors(['Confirm password field must be the same as password field.']);
    };

    const updateAlbum = async (e) => {
        e.preventDefault();
        console.log("you are here!!!")
        return dispatch(albumActions.thunk_updatealbum({ albumId: 3, title, description }))
    };

    const deleteAlbum = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        return dispatch(albumActions.thunk_deletealbum({ albumId: 1 }))
    };

    const getAlbumById = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        return dispatch(albumActions.thunk_getAlbumById({ albumId: 1 }))
    };


    if (!sessionUser) return <Redirect to="/" />;

    return (
        <>
            <nav className="form-nav">
                <div onClick={redirectHome} className="formNav-logo">
                    <Logo />
                    <span className="form-logoText">Pixel</span>
                </div>
            </nav>
            <div className="form-background">
                <form onSubmit={handleSubmit} className="form-container" id="uploadPhoto-form-container">
                    <div className="form-header">
                        {/* <div className="logo">
                            <div id="logo-yellow"></div>
                            <div id="logo-red"></div>
                            <div id="logo-blue"></div>
                        </div> */}
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
                        // required
                        />
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Description (optional)"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        // required
                        />
                        <button className="form-button" type="submit">Create Album</button>
                        <button className="form-button" onClick={deleteAlbum}>Delete Album</button>
                        <button className="form-button" onClick={updateAlbum}>Edit Album</button>
                        <button className="form-button" onClick={getAlbumById}>Get album by Id</button>
                    </div>

                    {/* <div className="redirect-container">
                        <span className="redirect-text">Already a Pixel member? </span>
                        <NavLink className="redirect-link" to="/login">Log in here.</NavLink>
                    </div> */}
                </form>
            </div>
        </>
    );
}

export default CreateAlbumForm;