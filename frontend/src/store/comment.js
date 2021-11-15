import { csrfFetch } from "./csrf";

const ADD_COMMENT = "comments/ADD_COMMENT";
const DELETE_COMMENT = "comments/DELETE_COMMENT";
const UPDATE_COMMENT = "comments/UPDATE_COMMENT";

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment,
});

const deleteComment = (deletedCommentId) => ({
    type: DELETE_COMMENT,
    deletedCommentId,
});

const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
});

// Get comment by id thunk
export const thunk_getCommentById = ({ commentId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        const comment = await res.json();
        // dispatch(getPhotoById(photo));
        return comment;
    }
};

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

// Update comment thunk
export const thunk_updatecomment = ({ commentId, content }) => async (dispatch) => {
    const res = await csrfFetch(`/api/comments/${commentId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            commentId,
            content
        })
    });

    if (res.ok) {
        const updatedComment = await res.json();
        dispatch(updateComment(updatedComment));
        return updatedComment;
    }
};


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