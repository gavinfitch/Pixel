import { csrfFetch } from "./csrf";

const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
    type: SET_USER,
    user,
});

const removeUser = () => ({
    type: REMOVE_USER,
    user: null,
});

export const thunk_setUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");

    if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user.user));
        return user.user;
    }
};

export const thunk_removeUser = () => async (dispatch) => {
    const res = await csrfFetch("/api/session");

    if (res.ok) {
        const user = await res.json();
        dispatch(removeUser(user.user));
        return user.user;
    }
};

// Login thunk
export const thunk_login = ({ credential, password }) => async (dispatch) => {
    const res = await csrfFetch("/api/session", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            credential,
            password
        })
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user.user));
        return user.user;
    }
};

// Signup thunk
export const thunk_signup = ({ firstName, lastName, username, email, password }) => async (dispatch) => {
    const res = await csrfFetch("/api/users", {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            email,
            password
        })
    });

    if (res.ok) {
        const user = await res.json();
        dispatch(setUser(user.user));
        return user.user;
    }
};

// Logout thunk
export const thunk_logout = () => async (dispatch) => {
    const res = await csrfFetch("/api/session", { method: 'DELETE' });

    if (res.ok) {
        const successMessage = await res.json();
        dispatch(removeUser());
        return successMessage;
    }
};

const sessionReducer = (state = { user: null }, action) => {
    switch (action.type) {
        case SET_USER: {
            return { ...state, user: action.user }
        }
        case REMOVE_USER: {
            return { ...state, user: action.user }
        }
        default:
            return state;
    }
};

export default sessionReducer;