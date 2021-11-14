import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import S3 from 'react-aws-s3';
import * as commentActions from "../../store/comment";
import './CreateCommentForm.css';
import Logo from '../Logo';

function CreateCommentForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector((state) => state.session.user);
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState([]);

    // const config = {
    //     bucketName: 'pixelphotostorage',
    //     region: 'us-west-2',
    //     accessKeyId: '',
    //     secretAccessKey: '',
    // }

    // const ReactS3Client = new S3(config);

    const redirectHome = () => {
        history.push("/")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = sessionUser.id;

        // console.log("YOU ARE IN THE HANDLER", userId, title, description)

        return dispatch(commentActions.thunk_addcomment({ userId, photoId: 1, content }))

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

    const updateComment = async (e) => {
        e.preventDefault();
        // console.log("you are here!!!")
        return dispatch(commentActions.thunk_updatecomment({ commentId: 2, content }))
    };

    const deleteComment = async (e) => {
        e.preventDefault();
        // console.log("you are here")

        return dispatch(commentActions.thunk_deletecomment({ commentId: 1 }))
    };

    const getCommentById = async (e) => {
        e.preventDefault();
        // console.log("you are here")

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
                        {/* <div className="logo">
                            <div id="logo-yellow"></div>
                            <div id="logo-red"></div>
                            <div id="logo-blue"></div>
                        </div> */}
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
                        // required
                        />
                        <button className="form-button" type="submit">Add comment</button>
                        <button className="form-button" onClick={deleteComment}>Delete comment</button>
                        <button className="form-button" onClick={updateComment}>Edit comment</button>
                        <button className="form-button" onClick={getCommentById}>Get comment by id</button>
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

export default CreateCommentForm;