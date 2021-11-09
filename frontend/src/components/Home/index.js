import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";

import ProfileButton from '../Navigation/ProfileButton';
import Logo from '../Logo';
import './Home.css';

function Home({ isLoaded }) {

    const [feedDisplay, setFeedDisplay] = useState("Albums");

    const sessionUser = useSelector(state => state.session.user);
    const userPhotosObj = useSelector(state => state.photos);
    const userAlbumsObj = useSelector(state => state.albums);

    const userPhotosArr = Object.values(userPhotosObj);
    const userAlbumsArr = Object.values(userAlbumsObj);

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
        history.push("/")
    };

    // Logout function
    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.thunk_logout());
    };

    // Delete photo function
    const deletePhoto = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        // console.log(e.target.value)
        return dispatch(photoActions.thunk_deletephoto({ photoId: e.target.value }))
    };

    useEffect(() => {
        dispatch(photoActions.thunk_getPhotosByUserId({ userId }))
        dispatch(albumActions.thunk_getAlbumsByUserId({ userId }))
    }, [dispatch])


    if (sessionUser) {
        return (
            <div className="home-container">
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
                <div id="your-photos">{feedDisplay}</div>

                {feedDisplay === "Photostream" && <ul className="home-photos-feed">
                    {userPhotosArr.map(photo =>
                        <li className="home-photoLi" key={photo.id}>
                            <img className="home-img" src={photo.photoURL}></img>
                            <div id="home-photoMask">

                                <div className="mask-item">
                                    <div>{photo.title}</div>
                                </div>
                                <div className="mask-item">
                                    <button className="mask-button" onClick={() => history.push(`/photos/${photo.id}/edit`)}>Edit</button>
                                    <button className="mask-button" value={photo.id} onClick={deletePhoto}>Delete</button>
                                </div>

                            </div>
                        </li>
                    )}
                </ul>}

                {feedDisplay === "Albums" && <ul className="home-albums-feed">
                    {userAlbumsArr.map((album) => {

                        const albumPhotos = userPhotosArr.filter(photo => photo.albumId === album.id)
                        const date = new Date(album.createdAt).toString().split(" ");

                        return (
                            <li style={{backgroundImage: `url(${albumPhotos[0].photoURL})`}} className="album-thumb-container">
                                <div id="album-thumbMask">
                                    <div className="album-maskItem">
                                        <div>{album.title}</div>
                                        <div>Created {date[1]} {date[3]}</div>
                                    </div>
                                    <div className="album-maskItem">{albumPhotos.length} photos</div>
                                    <div className="album-maskItem">
                                        <button className="album-maskButton">Edit</button>
                                        <button className="album-maskButton">Delete</button> 
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
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        );
    }
}

export default Home;