import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as albumActions from "../../store/album";
import './EditAlbumForm.css';
import Logo from '../Logo';

function CreateAlbumForm() {

    const albums = useSelector((state) => state.albums);
    const { id } = useParams()
    const currentAlbum = albums[id];

    let titleString;
    if (currentAlbum?.title) {
        titleString = currentAlbum.title;
    }


    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState(currentAlbum?.title);
    const [description, setDescription] = useState(currentAlbum?.description);
    const [errors, setErrors] = useState([]);

    const redirectHome = () => {
        history.push("/")
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     return dispatch(albumActions.thunk_updatealbum({ albumId: id, title, description }))
    // };

    const updateAlbum = async (e) => {
        e.preventDefault();
        history.push("/")
        return dispatch(albumActions.thunk_updatealbum({ albumId: id, title, description }))
    };

    useEffect(() => {
        const userId = sessionUser.id;
        dispatch(albumActions.thunk_getAlbumsByUserId({ userId }))
    }, [dispatch])


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
                <form className="form-container" id="editAlbum-form-container">
                    <div className="form-header">
                        <Logo />
                        <div className="form-headerText">Edit {titleString || "album"}</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div className="editAlbum-field-container">
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
                        <button className="form-button" onClick={updateAlbum}>Edit</button>
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

export default CreateAlbumForm;