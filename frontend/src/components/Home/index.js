import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import S3 from 'react-aws-s3';

import Logo from '../Logo';
import SplashPage from '../SplashPage';

import * as sessionActions from '../../store/session';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";

import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const history = useHistory();

    const dropdownRef = useRef(null);

    const s3envKey = process.env.REACT_APP_AWS_KEY;
    const s3envSecretKey = process.env.REACT_APP_AWS_SECRET_KEY;

    const [feedDisplay, setFeedDisplay] = useState("Your feed");
    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [fullScreenPhoto, setFullScreenPhoto] = useState(null);

    const sessionUser = useSelector(state => state.session.user);
    const allPhotosObj = useSelector(state => state.photos);
    const userAlbumsObj = useSelector(state => state.albums);

    const allPhotosArr = Object.values(allPhotosObj);
    const userAlbumsArr = Object.values(userAlbumsObj);

    const sortedAllPhotosArr = allPhotosArr.sort(function (a, b) {
        let keyA = new Date(a.updatedAt);
        let keyB = new Date(b.updatedAt);
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    const sortedUserAlbumsArr = userAlbumsArr.sort(function (a, b) {
        let keyA = new Date(a.updatedAt);
        let keyB = new Date(b.updatedAt);
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });

    const config = {
        bucketName: 'pixelphotoapp',
        region: 'us-west-2',
        accessKeyId: s3envKey,
        secretAccessKey: s3envSecretKey,
    }

    const ReactS3Client = new S3(config);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    const userPhotosArr = allPhotosArr.filter(photo => photo.userId === userId)

    // Redirect home function
    const redirectHome = () => {
        setFeedDisplay("Your feed");
        history.push("/");
    };

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

        await ReactS3Client
            .deleteFile(s3Name)
            .then(response => console.log(response))
            .catch(err => console.error(err))

        return dispatch(photoActions.thunk_deletephoto({ photoId: id }))
    };

    // Delete album function
    const deleteAlbum = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        history.push("/");
        if (!(userAlbumsArr.length - 1)) {
            setFeedDisplay("Your feed")
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
                    <div onClick={redirectHome} id="logo-container">
                        <Logo />
                        <div className="form-logoText" id="home-logoText">Pixel</div>
                    </div>
                    <div className="upload-logout-container">
                        <NavLink to='/photos/new'><i className="fas fa-cloud-upload-alt"></i></NavLink>
                        <button id="logout-button" onClick={logout}>Log out</button>
                    </div>
                </nav>

                <div id="dropdown-container">
                    <div onClick={() => setDropDownOpen(!dropDownOpen)} id="your-photos">{feedDisplay}<i className="fas fa-chevron-down"></i></div>
                </div>
                {feedDisplay === "Your feed" && <div className="scroll">Scroll<i class="fas fa-arrow-right"></i></div>}
                {(feedDisplay === "Photostream" && userPhotosArr.length > 0) && <div className="scroll-photostream">Scroll<i class="fas fa-arrow-right"></i></div>}
                {dropDownOpen &&
                    <>
                        <div id="caretDiv"><i className="fas fa-caret-up"></i></div>
                        <ul ref={dropdownRef} className="feedDisplay-list">
                            <li onClick={() => {
                                setFeedDisplay("Your feed")
                                setDropDownOpen(false)
                            }}>Your feed</li>

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

                {feedDisplay === "Your feed" && <ul className="home-photos-feed">
                    {sortedAllPhotosArr.map(photo =>
                        <li onClick={() => {
                            setFullScreen(true);
                            setFullScreenPhoto(photo);
                            document.body.classList.add('stop-scrolling');
                        }} className="home-photoLi" key={photo.id}>
                            <img className="home-img" src={photo.photoURL}></img>
                            <div id="home-photoMask">
                                {photo.userId === userId && <div onClick={() => history.push(`/photos/${photo.id}/albumselect`)} className="photo-albumSelect"><i class="far fa-plus-square"></i></div>}
                                <div className="mask-item">
                                    <div>{photo.title}</div>
                                </div>
                                {photo.userId === userId && <div className="mask-item">
                                    <button className="mask-button" onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(`/photos/${photo.id}/edit`)
                                    }
                                    }>Edit</button>
                                    <button className="mask-button" value={JSON.stringify({ id: photo.id, s3Name: photo.s3Name })} onClick={deletePhoto}>Delete</button>
                                </div>}

                            </div>
                        </li>
                    )}
                </ul>}

                {feedDisplay === "Photostream" && <ul className="home-photos-feed">
                    {userPhotosArr.length < 1 && <div className="noContent-container"><div className="noContent-text">You don't have any photos yet, try <span className="noContent-link" onClick={() => history.push("/photos/new")}>uploading</span> some.</div></div>}
                    {userPhotosArr.length > 0 && userPhotosArr.map(photo =>
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
                    {userAlbumsArr.length < 1 && <div className="noContent-container"><div className="noContent-text">You don't have any albums yet, try <span className="noContent-link" onClick={() => history.push("/albums/new")}>creating</span> one.</div></div>}
                    {sortedUserAlbumsArr.length > 0 && sortedUserAlbumsArr.map((album) => {

                        const albumPhotos = userPhotosArr.filter(photo => photo.albumId === album.id)
                        const date = new Date(album?.createdAt).toString().split(" ");

                        let backgroundImgURL;
                        if (albumPhotos[0]) {
                            backgroundImgURL = albumPhotos[0].photoURL;
                        } else {
                            backgroundImgURL = "https://pixelphotoapp.s3.us-west-2.amazonaws.com/pixel-seeder-photos/splash-images/Tim-empty-album-background.jpg";
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