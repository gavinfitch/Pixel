import { csrfFetch } from "./csrf";

const SET_PHOTOS = "photo/SET_PHOTOS";
const ADD_PHOTO = "photo/ADD_PHOTO";
const UPDATE_PHOTO = "photo/UPDATE_PHOTO";
const DELETE_PHOTO = "photo/DELETE_PHOTO";

const setPhotos = (photos) => ({
    type: SET_PHOTOS,
    photos
});

const addPhoto = (photo) => ({
    type: ADD_PHOTO,
    photo,
});

const updatePhoto = (photo) => ({
    type: UPDATE_PHOTO,
    photo,
});

const deletePhoto = (deletedPhotoId) => ({
    type: DELETE_PHOTO,
    deletedPhotoId,
});


// Get photo by photoId thunk
export const thunk_getPhotoById = ({ photoId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${photoId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        const photo = await res.json();
        // dispatch(getPhotoById(photo));
        return photo;
    }
};

// Get photos by user id thunk
export const thunk_getPhotosByUserId = ({ userId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/photos/users/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        const photos = await res.json();
        dispatch(setPhotos(photos));
        return photos;
    }
};

// Add photo thunk
export const thunk_addphoto = ({ userId, title, description, photoURL, s3Name }) => async (dispatch) => {

    const res = await csrfFetch("/api/photos", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            title,
            description,
            photoURL,
            s3Name
        })
    });

    if (res.ok) {
        const photo = await res.json();
        dispatch(addPhoto(photo));
        return photo;
    }
};

// Delete photo thunk
export const thunk_deletephoto = ({ photoId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/photos/${photoId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            photoId
        })
    });

    if (res.ok) {
        const deletedPhoto = await res.json();
        dispatch(deletePhoto(deletedPhoto.photoToDelete.id));
        return "Deletion successful";
    }
};

// Update photo thunk
export const thunk_updatephoto = ({ photoId, title, description }) => async (dispatch) => {

    const res = await csrfFetch(`/api/photos/${photoId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            photoId,
            title,
            description
        })
    });

    if (res.ok) {
        const updatedPhoto = await res.json();
        dispatch(updatePhoto(updatedPhoto));
        return updatedPhoto;
    }
};

// Album select photo thunk
export const thunk_selectalbum = ({ photoId, albumId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/photos/${photoId}/albumselect`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            photoId,
            albumId
        })
    });

    if (res.ok) {
        const updatedPhoto = await res.json();
        dispatch(updatePhoto(updatedPhoto));
        return updatedPhoto;
    }
};

// Album remove photo thunk
export const thunk_removealbum = ({ photoId }) => async (dispatch) => {

    const res = await csrfFetch(`/api/photos/${photoId}/albumremove`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            photoId
        })
    });

    if (res.ok) {
        const updatedPhoto = await res.json();
        dispatch(updatePhoto(updatedPhoto));
        return updatedPhoto;
    }
};

// Photo Reducer
const photoReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_PHOTOS: {
            const newState = { ...state }
            action.photos.photos.forEach(photo => newState[photo.id] = photo);
            return newState;
        }
        case ADD_PHOTO: {
            const newState = { ...state }
            newState[action.photo.photo.id] = action.photo.photo;
            return newState;
        }
        case DELETE_PHOTO: {
            const newState = { ...state }
            delete newState[action.deletedPhotoId];
            return newState;
        }
        case UPDATE_PHOTO: {
            const newState = { ...state }
            newState[action.photo.updatedPhoto.id] = action.photo.updatedPhoto;
            return newState;
        }
        default:
            return state;
    }
};

export default photoReducer;