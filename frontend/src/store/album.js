import { csrfFetch } from "./csrf";

const SET_ALBUMS = "albums/SET_PHOTOS";
const ADD_ALBUM = "album/ADD_ALBUM";
const DELETE_ALBUM = "album/DELETE_ALBUM";
const UPDATE_ALBUM = "album/UPDATE_ALBUM";

const setAlbums = (albums) => ({
    type: SET_ALBUMS,
    albums
});

const addAlbum = (album) => ({
    type: ADD_ALBUM,
    album,
});

const deleteAlbum = (deletedAlbumId) => ({
    type: DELETE_ALBUM,
    deletedAlbumId,
});

const updateAlbum = (album) => ({
    type: UPDATE_ALBUM,
    album,
});

// Get album by id thunk
export const thunk_getAlbumById = ({ albumId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        const album = await res.json();
        // dispatch(getPhotoById(photo));
        console.log(album)
        return album;
    }
};

// Get photo by user id thunk
export const thunk_getAlbumsByUserId = ({ userId }) => async (dispatch) => {

    console.log("thunk_getAlbumsByUserId", userId)
    const res = await csrfFetch(`/api/albums/users/${userId}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    });

    if (res.ok) {
        const albums = await res.json();
        // console.log("Frontend thunk albums", albums)
        dispatch(setAlbums(albums));

        return albums;
    }
};

// Add album thunk
export const thunk_addalbum = ({ userId, title, description }) => async (dispatch) => {
    const res = await csrfFetch("/api/albums", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId,
            title,
            description,
        })
    });

    if (res.ok) {
        const album = await res.json();
        dispatch(addAlbum(album));
        return album;
    }
};

// Delete album thunk
export const thunk_deletealbum = ({ albumId }) => async (dispatch) => {
    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            albumId
        })
    });

    if (res.ok) {
        const deletedAlbum = await res.json();
        dispatch(deleteAlbum(deletedAlbum.albumToDelete.id));
        return "Deletion successful";
    }
};

// Update album thunk
export const thunk_updatealbum = ({ albumId, title, description }) => async (dispatch) => {

    console.log(albumId, title, description)

    const res = await csrfFetch(`/api/albums/${albumId}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            albumId,
            title,
            description
        })
    });

    if (res.ok) {
        const updatedAlbum = await res.json();
        dispatch(updateAlbum(updatedAlbum));
        return updatedAlbum;
    }
};


// Album Reducer
const albumReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ALBUMS: {
            const newState = { ...state }
            action.albums.albums.forEach(album => newState[album.id] = album);
            return newState;
        }
        case ADD_ALBUM: {
            const newState = { ...state }
            newState[action.album.album.id] = action.album.album;
            return newState;
        }
        case DELETE_ALBUM: {
            const newState = { ...state }
            delete newState[action.deletedAlbumId];
            return newState;
        }
        case UPDATE_ALBUM: {
            const newState = { ...state }
            newState[action.album.updatedAlbum.id] = action.album.updatedAlbum;
            return newState;
        }
        default:
            return state;
    }
};

export default albumReducer;