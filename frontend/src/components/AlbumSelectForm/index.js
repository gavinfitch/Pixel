import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";
import './AlbumSelectForm.css';
import Logo from '../Logo';

function AlbumSelectForm() {

    const userAlbumsObj = useSelector(state => state.albums);
    const userAlbumsArr = Object.values(userAlbumsObj);

    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("");
    const [albumId, setAlbumId] = useState(null);
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState();
    // const [album, setAlbum] = useState(null);
    const [errors, setErrors] = useState([]);



    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    const photoId = useParams().id
    // console.log(photoId)

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

        console.log("THIS IS IT", photoId, albumId)

        return dispatch(photoActions.thunk_selectalbum({ photoId, albumId }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push("/"))
            

        // const userId = sessionUser.id;
        // let s3Photo;

        // await ReactS3Client
        //     .uploadFile(photo, title)
        //     .then(data => s3Photo = data)
        //     .catch(err => console.error(err))

        // const photoURL = s3Photo.location;

        // history.push("/")
        // return dispatch(photoActions.thunk_addphoto({ userId, title, description, photoURL }))


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
        console.log("you are here!!!")
        return dispatch(photoActions.thunk_updatephoto({ photoId: 1, title, description }))
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
            <div id="albumSelect-form-background">
                <form onSubmit={handleSubmit} className="form-container" id="selectAlbum-form-container">
                    <div className="form-header">
                        {/* <div className="logo">
                            <div id="logo-yellow"></div>
                            <div id="logo-red"></div>
                            <div id="logo-blue"></div>
                        </div> */}
                        <Logo />
                        <div className="form-headerText">Select album</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div id="albumSelect-field-container">
                        <select id="albumSelect-dropdown" onChange={(e) => setAlbumId(e.target.value)}>
                            <option hidden>Please select album </option>
                            {userAlbumsArr.map(album => {
                                return (
                                    <option key={album.id} value={album.id}>
                                        {album.title}
                                    </option>
                                )
                            })}
                        </select>
                        <button id="selectAlbum-form-button" type="submit">Add photo to album</button>
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

export default AlbumSelectForm;