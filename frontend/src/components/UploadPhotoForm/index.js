import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as photoActions from "../../store/photo";
import './UploadPhotoForm.css';
import Logo from '../Logo';

function UploadPhotoForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState();
    // const [album, setAlbum] = useState(null);
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
        let s3Photo;

        await ReactS3Client
            .uploadFile(photo, title)
            .then(data => s3Photo = data)
            .catch(err => console.error(err))

        const photoURL = s3Photo.location;

        return dispatch(photoActions.thunk_addphoto({ userId, title, description, photoURL }))

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

    const deletePhoto = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        ReactS3Client
            .deleteFile('Hornby Ferry pic.jpeg')
            .then(response => console.log(response))
            .catch(err => console.error(err))

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
                        <input
                            className="form-field"
                            type="file"
                            // value={photo.name}
                            onChange={(e) => setPhoto(e.target.files[0])}
                        // required
                        />
                        <button className="form-button" type="submit">Upload</button>
                        {/* <button className="form-button" onClick={deletePhoto}>Delete Photo</button> */}
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

export default UploadPhotoForm;