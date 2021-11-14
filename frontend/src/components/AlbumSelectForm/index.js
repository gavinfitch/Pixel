import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import Logo from '../Logo';
import * as photoActions from "../../store/photo";
import * as albumActions from "../../store/album";
import './AlbumSelectForm.css';


function AlbumSelectForm() {

    const sessionUser = useSelector((state) => state.session.user);
    const userAlbumsObj = useSelector(state => state.albums);
    const userAlbumsArr = Object.values(userAlbumsObj);

    const dispatch = useDispatch();
    const history = useHistory();

    const [albumId, setAlbumId] = useState(null);
    const [errors, setErrors] = useState([]);

    let userId;
    if (sessionUser) {
        userId = sessionUser.id;
    }

    const photoId = useParams().id

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        return dispatch(photoActions.thunk_selectalbum({ photoId, albumId }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors)
            }).then((res) => res && history.push("/"))
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
                </form>
            </div>
        </>
    );
}

export default AlbumSelectForm;