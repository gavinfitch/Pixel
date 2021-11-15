import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useHistory, useParams } from 'react-router-dom';

import Logo from '../Logo';

import * as sessionActions from '../../store/session';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";

import '../Home/Home.css';

function AlbumViewPage() {
    const dispatch = useDispatch();
    const history = useHistory();

    const dropdownRef = useRef(null);

    const [dropDownOpen, setDropDownOpen] = useState(false);
    const [fullScreen, setFullScreen] = useState(false);
    const [fullScreenPhoto, setFullScreenPhoto] = useState(null);

    const sessionUser = useSelector(state => state.session.user);

    const userAlbumsObj = useSelector(state => state.albums);
    const userAlbumsArr = Object.values(userAlbumsObj);

    const albumId = useParams().id;
    const currentAlbum = userAlbumsObj[albumId];

    const userPhotosObj = useSelector(state => state.photos);
    const userPhotosArr = Object.values(userPhotosObj).filter((photo) => photo.albumId === +albumId);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    let albumTitle = null;
    if (currentAlbum) {
        albumTitle = currentAlbum.title;
    }

    // Redirect home function
    const redirectHome = () => {
        history.push("/");
    };

    // Logout function
    const logout = (e) => {
        e.preventDefault();
        return dispatch(sessionActions.thunk_logout());
    };

    // Delete photo function
    const deletePhoto = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        return dispatch(photoActions.thunk_deletephoto({ photoId: e.target.value }))
    };

    // Remove photo from album function
    const removeAlbum = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        return dispatch(photoActions.thunk_removealbum({ photoId: e.target.value }))
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
                        <div className="fullScreen-caption">By <span className="credits-name">{fullScreenPhoto.User.firstName} {fullScreenPhoto.User.lastName}</span></div>
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
                {albumTitle && <div onClick={() => setDropDownOpen(!dropDownOpen)} id="your-photos">{albumTitle}<i className="fas fa-chevron-down"></i></div>}

                {dropDownOpen &&
                    <>
                        <div id="caretDiv"><i className="fas fa-caret-up"></i></div>
                        <ul ref={dropdownRef} className="feedDisplay-list">
                            {userAlbumsArr.map(album => {
                                return (<li onClick={() => {
                                    setDropDownOpen(false)
                                    history.push(`/albums/${album.id}`)
                                }}>{album.title}</li>)
                            })}
                        </ul>
                    </>
                }

                <div id="createAlbum-button" onClick={() => history.push("/albums/new/")}><i className="far fa-plus-square createAlbum-plus"></i><span className="createAlbum-text">Create album</span></div>

                <ul className="home-photos-feed">
                    {userPhotosArr.map(photo =>
                        <li onClick={() => {
                            setFullScreen(true);
                            setFullScreenPhoto(photo);
                            document.body.classList.add('stop-scrolling');
                        }} className="home-photoLi" key={photo.id}>
                            <img className="home-img" src={photo.photoURL}></img>
                            <div id="home-photoMask">

                                <div className="mask-item">
                                    <div>{photo.title}</div>
                                </div>
                                <div className="mask-item">
                                    <button id="albumRemove-button" onClick={removeAlbum} value={photo.id} className="photo-albumSelect far fa-minus-square"></button>
                                    <button className="mask-button" onClick={(e) => {
                                        e.stopPropagation();
                                        history.push(`/photos/${photo.id}/edit`)
                                    }}>Edit</button>
                                    <button className="mask-button" value={photo.id} onClick={deletePhoto}>Delete</button>
                                </div>

                            </div>
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

export default AlbumViewPage;