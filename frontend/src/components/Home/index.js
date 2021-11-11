import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import S3 from 'react-aws-s3';
import SplashPage from '../SplashPage';

import * as sessionActions from '../../store/session';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";

import ProfileButton from '../Navigation/ProfileButton';
import Logo from '../Logo';
import './Home.css';

function Home({ isLoaded }) {

    const dropdownRef = useRef(null);

    const [errors, setErrors] = useState(null)
    const [feedDisplay, setFeedDisplay] = useState("Photostream");
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [fullScreenPhoto, setFullScreenPhoto] = useState(null);

    const sessionUser = useSelector(state => state.session.user);
    const userPhotosObj = useSelector(state => state.photos);
    const userAlbumsObj = useSelector(state => state.albums);

    const userPhotosArr = Object.values(userPhotosObj);
    const userAlbumsArr = Object.values(userAlbumsObj);

    const config = {
        bucketName: 'pixelphotostorage',
        region: 'us-west-2',
        accessKeyId: 'AKIAQ5HCEL66DJMSJ66K',
        secretAccessKey: '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',
    }

    const ReactS3Client = new S3(config);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }


    // console.log("photos arr", userPhotosArr);

    const history = useHistory();
    const dispatch = useDispatch();

    // let hover = false;

    // Redirect home function
    const redirectHome = () => {
        setFeedDisplay("Photostream");
        history.push("/");
    };

    const guestLogin = e => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.thunk_login({ credential: "acek123", password: "password" }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            });
    }

    // Logout function
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunk_logout());
    };

    // Delete photo function
    const deletePhoto = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const { id, s3Name } = JSON.parse(e.target.value);

        console.log(s3Name)


        await ReactS3Client
            .deleteFile(s3Name)
            .then(response => console.log(response))
            .catch(err => console.error(err))

        return dispatch(photoActions.thunk_deletephoto({ photoId: id }))
    };

    // Delete photo function
    const removePhotoFromAlbum = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        // console.log(e.target.value)
        return dispatch(photoActions.thunk_deletephoto({ photoId: e.target.value }))
    };

    // Delete photo function
    const deleteAlbum = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("you are here")

        // console.log(e.target.value)
        history.push("/");
        if (!(userAlbumsArr.length - 1)) {
            setFeedDisplay("Photostream")
        }
        return dispatch(albumActions.thunk_deletealbum({ albumId: e.target.value }))
    };

    useEffect(() => {
        dispatch(photoActions.thunk_getPhotosByUserId({ userId }))
        dispatch(albumActions.thunk_getAlbumsByUserId({ userId }))
        document.body.classList.remove('stop-scrolling');
    }, [dispatch])

    useEffect(() => {

        const pageClickEvent = (e) => {
            console.log(e)
            if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
                setDropDownOpen(!dropDownOpen);
            }
        };

        if (dropDownOpen) {
            window.addEventListener('click', pageClickEvent);
        }

        return () => {
            window.removeEventListener('click', pageClickEvent);
        }

    }, [dropDownOpen])


    if (sessionUser) {
        return (
            <div className="home-container">

                {fullScreen && <div id="fullScreen-container">
                    <i onClick={() => {
                        setFullScreen(false);
                        setFullScreenPhoto(null);
                        document.body.classList.remove('stop-scrolling');
                    }} class="far fa-window-close"></i>
                    <div className="fullScreen-photo-container">
                        <img className="fullScreen-photo" src={fullScreenPhoto.photoURL}></img>
                        <div id="fullScreen-title" className="fullScreen-caption">{fullScreenPhoto.title}</div>
                        <div className="fullScreen-caption">By <span className="credits-name">{fullScreenPhoto.User?.firstName} {fullScreenPhoto.User?.lastName}</span></div>
                    </div>
                </div>}

                <nav className="home-nav">
                    <div onClick={redirectHome} className="formNav-logo">
                        <Logo />
                        <span className="form-logoText" id="home-logoText">Pixel</span>
                    </div>
                    <div className="upload-logout-container">
                        <NavLink to='/photos/new'><i className="fas fa-cloud-upload-alt"></i></NavLink>
                        <button id="logout-button" onClick={logout}>Log out</button>
                    </div>
                </nav>
                <div onClick={() => setDropDownOpen(!dropDownOpen)} id="your-photos">{feedDisplay}<i className="fas fa-chevron-down"></i></div>

                {dropDownOpen &&
                    <>
                        <div id="caretDiv"><i className="fas fa-caret-up"></i></div>
                        <ul ref={dropdownRef} className="feedDisplay-list">
                            <li onClick={() => {
                                setFeedDisplay("Photostream")
                                setDropDownOpen(false)
                            }}>Photostream</li>

                            <li onClick={() => {
                                setFeedDisplay("Albums")
                                setDropDownOpen(false)
                            }}>Albums</li>
                        </ul>
                    </>
                }

                {feedDisplay === "Photostream" && <ul className="home-photos-feed">
                    {userPhotosArr.map(photo =>
                        <li onClick={() => {
                            setFullScreen(true);
                            setFullScreenPhoto(photo);
                            document.body.classList.add('stop-scrolling');
                        }} className="home-photoLi" key={photo.id}>
                            <img className="home-img" src={photo.photoURL}></img>
                            <div id="home-photoMask">
                                <div onClick={() => history.push(`/photos/${photo.id}/albumselect`)} className="photo-albumSelect"><i class="far fa-plus-square"></i></div>
                                <div className="mask-item">
                                    <div>{photo.title}</div>
                                </div>
                                <div className="mask-item">
                                    <button className="mask-button" onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(`/photos/${photo.id}/edit`)
                                    }
                                    }>Edit</button>
                                    <button className="mask-button" value={JSON.stringify({ id: photo.id, s3Name: photo.s3Name })} onClick={deletePhoto}>Delete</button>
                                </div>

                            </div>
                        </li>
                    )}
                </ul>}

                {feedDisplay === "Albums" && <ul className="home-albums-feed">
                    <div id="createAlbum-button" onClick={() => history.push("/albums/new/")}><i className="far fa-plus-square createAlbum-plus"></i><span className="createAlbum-text">Create album</span></div>
                    {userAlbumsArr.map((album) => {

                        const albumPhotos = userPhotosArr.filter(photo => photo.albumId === album.id)
                        const date = new Date(album?.createdAt).toString().split(" ");

                        let backgroundImgURL;
                        if (albumPhotos[0]) {
                            backgroundImgURL = albumPhotos[0].photoURL;
                        } else {
                            backgroundImgURL = "https://pixelphotostorage.s3.us-west-2.amazonaws.com/pixel-seeder-photos/Trip+to+Japan/beautiful_tree.jpg";
                        }

                        return (

                            <li onClick={() => history.push(`/albums/${album.id}`)} style={{ backgroundImage: `url(${backgroundImgURL})` }} className="album-thumb-container">
                                <div id="album-thumbMask">

                                    <div id="album-details" className="album-maskItem">
                                        <div id="album-title">{album.title}</div>
                                        <div id="album-photoCount">{albumPhotos.length} photos</div>
                                        <div id="album-date">Created {date[1]} {date[3]}</div>

                                    </div>
                                    <div className="album-editDelete-buttons">
                                        <button onClick={(e) => {
                                            e.stopPropagation();
                                            history.push(`/albums/${album.id}/edit`)
                                        }
                                        } className="album-maskButton">Edit</button>
                                        <button value={album.id} onClick={deleteAlbum} className="album-maskButton">Delete</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })}

                </ul>}

            </div>
        );
    }

    else {
        return (
            <SplashPage />
        );
    }
}

export default Home;