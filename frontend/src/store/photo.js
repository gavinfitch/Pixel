import { csrfFetch } from "./csrf";

const ADD_PHOTO = "photo/ADD_PHOTO";
const DELETE_PHOTO = "photo/DELETE_PHOTO";

const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    photo,
});

const deletePhoto = (photo) => ({
    type: DELETE_PHOTO,
    photo,
});

// Add photo thunk
export const thunk_addphoto = ({ userId, title, description, photoURL }) => async (dispatch) => {
    const res = await csrfFetch("/api/photos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            title,
            description,
            photoURL
        })
    });

    if (res.ok) {
        const photo = await res.json();
        dispatch(addPhoto(photo));
        return photo;
    }
};

const photoReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PHOTO: {
            return { ...state, photo: action.photo }
        }
        default:
            return state;
    }
};

export default photoReducer;