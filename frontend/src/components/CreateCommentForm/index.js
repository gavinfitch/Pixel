import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import Logo from '../Logo';

import * as commentActions from "../../store/comment";

import './CreateCommentForm.css';

function CreateCommentForm() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    const sessionUser = useSelector((state) => state.session.user);

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = sessionUser.id;

        return dispatch(commentActions.thunk_addcomment({ userId, photoId: 1, content }))
    };

    const updateComment = async (e) => {
        e.preventDefault();
        return dispatch(commentActions.thunk_updatecomment({ commentId: 2, content }))
    };

    const deleteComment = async (e) => {
        e.preventDefault();
        return dispatch(commentActions.thunk_deletecomment({ commentId: 1 }))
    };

    const getCommentById = async (e) => {
        e.preventDefault();
        return dispatch(commentActions.thunk_getCommentById({ commentId: 2 }))
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
                        <Logo />
                        <div className="form-headerText">Add Comment</div>
                    </div>
                    {errors.length > 0 && <ul className="errors-container">
                        {errors.map((error, idx) => <li className="error" key={idx}>{error}</li>)}
                    </ul>}
                    <div className="field-container">
                        <input
                            className="form-field"
                            type="text"
                            placeholder="Enter your comment..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button className="form-button" type="submit">Add comment</button>
                        <button className="form-button" onClick={getCommentById}>Get comment by id</button>
                        <button className="form-button" onClick={updateComment}>Edit comment</button>
                        <button className="form-button" onClick={deleteComment}>Delete comment</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default CreateCommentForm;