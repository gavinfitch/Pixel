import { csrfFetch } from "./csrf";

const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
// const UPDATE_ALBUM = "album/UPDATE_ALBUM";

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment,
});

const deleteComment = (deletedCommentId) => ({
    type: DELETE_COMMENT,
    deletedCommentId,
});

// const updateAlbum = (album) => ({
//     type: UPDATE_ALBUM,
//     album,
// });

// Get album by id thunk
// export const thunk_getAlbumById = ({ albumId }) => async (dispatch) => {
//     const res = await csrfFetch(`/api/albums/${albumId}`, {
//         method: 'GET',
//         headers: {
//             "Content-Type": "application/json"
//         },
//     });

//     if (res.ok) {
//         const album = await res.json();
//         // dispatch(getPhotoById(photo));
//         console.log(album)
//         return album;
//     }
// };

// Add comment thunk
export const thunk_addcomment = ({ userId, photoId, content }) => async (dispatch) => {
    const res = await csrfFetch("/api/comments", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            photoId: photoId,
            content
        })
    });

    if (res.ok) {
        const comment = await res.json();
        dispatch(addComment(comment));
        return comment;
    }
};

// Delete comment thunk
export const thunk_deletecomment = ({ commentId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentId
        })
    });

    if (res.ok) {
        const deletedComment = await res.json();
        dispatch(deleteComment(deletedComment.id));
        return "Deletion successful";
    }
};

// Update album thunk
// export const thunk_updatealbum = ({ albumId, title, description }) => async (dispatch) => {

//     console.log(albumId, title, description)

//     const res = await csrfFetch(`/api/albums/${albumId}`, {
//         method: 'PUT',
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             albumId,
//             title,
//             description
//         })
//     });

//     if (res.ok) {
//         const updatedAlbum = await res.json();
//         dispatch(updateAlbum(updatedAlbum));
//         return updatedAlbum;
//     }
// };


// Album Reducer
const commentReducer = (state = [], action) => {
    switch (action.type) {
        case ADD_COMMENT: {
            const newState = { ...state }
            newState[action.comment.comment.id] = action.comment.comment;
            return newState;
        }
        case DELETE_COMMENT: {
            const newState = { ...state }
            delete newState[action.deletedCommentId];
            return newState;
        }
        default:
            return state;
    }
};

export default commentReducer;