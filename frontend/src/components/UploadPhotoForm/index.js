import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import S3 from 'react-aws-s3';

import Logo from '../Logo';

import * as photoActions from "../../store/photo";

import './UploadPhotoForm.css';

function UploadPhotoForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

    const sessionUser = useSelector((state) => state.session.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState();
    const [errors, setErrors] = useState([]);

    const config = {
        bucketName: 'pixelphotoapp',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }

    const ReactS3Client = new S3(config);

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id;
        let s3Photo;

        await ReactS3Client
            .uploadFile(photo, title.split(" ").join("-"))
            .then(data => s3Photo = data)
            .catch(err => console.error(err))

        const s3Name = s3Photo.key;
        const photoURL = s3Photo.location;

        return dispatch(photoActions.thunk_addphoto({ title, userId, description, photoURL, s3Name }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push("/"));
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
            <div id="uploadPhoto-form-background">
                <form onSubmit={handleSubmit} className="form-container" id="uploadPhoto-form-container">
                    <div id="uploadPhoto_form-header" className="form-header">
                        <Logo />
                        <div className="form-headerText">Upload a photo</div>
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
                        <input
                            className="form-field"
                            id="uploadPhoto-field"
                            type="file"
                            onChange={(e) => setPhoto(e.target.files[0])}
                            required
                        />
                        <button className="form-button" type="submit">Upload</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UploadPhotoForm;