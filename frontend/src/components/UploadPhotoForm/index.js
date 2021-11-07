import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, NavLink } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as sessionActions from "../../store/session";
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

    if (!sessionUser) return <Redirect to="/" />;

    const config = {
        bucketName: 'pixelphotostorage',
        // dirName: 'media', /* optional */
        region: 'us-west-2',
        accessKeyId: 'AKIAQ5HCEL66DJMSJ66K',
        secretAccessKey: 'imq9J1MpJbvhLqSvxyG0OTf+tS6OWllAl3np6cly',
        // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
    }

    const ReactS3Client = new S3(config);

    const redirectHome = () => {
        history.push("/")
    };

    const fileSelectedHandler = event => {
        console.log(event.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(title, description, photo)

        // const testFetch = await fetch('https://pixelphotostorage.s3.us-west-2.amazonaws.com/4c7tobjdCxZTmT4vc6YNVJ.jpeg')
        // console.log(testFetch)
        let amazonPhoto;
        await ReactS3Client
            .uploadFile(photo, title)
            .then(data => amazonPhoto = data)
            .catch(err => console.error(err))

        console.log("this is amazon photo ", amazonPhoto.location)


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