import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as photoActions from "../../store/photo";
import './EditPhotoForm.css';
import Logo from '../Logo';

function EditPhotoForm() {

    const photos = useSelector((state) => state.photos);
    const { id } = useParams()
    const currentPhoto = photos[id];

    let titleString;
    if (currentPhoto?.title) {
        titleString = currentPhoto.title;
    }

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState(currentPhoto?.title);
    const [description, setDescription] = useState(currentPhoto?.description);
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

        history.push("/")
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

    const updatePhoto = async (e) => {
        e.preventDefault();
        // console.log("you are here!!!")
        history.push("/")
        return dispatch(photoActions.thunk_updatephoto({ photoId: id, title, description }))
    };

    const deletePhoto = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        return dispatch(photoActions.thunk_deletephoto({ photoId: 16 }))
    };

    const getPhotoById = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        return dispatch(photoActions.thunk_getPhotoById({ photoId: 1 }))
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
            <div className="form-background">
                <form onSubmit={handleSubmit} id="editPhoto-form-container">
                    <div className="form-header">
                        <Logo />
                        <div className="form-headerText">Edit {titleString || "photo"}</div>
                    </div>
                    {/* {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>} */}
                    <div id="edit-field-container" className="field-container">
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
                        <button className="form-button" onClick={updatePhoto}>Edit</button>
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

export default EditPhotoForm;