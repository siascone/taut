import csrfFetch from "./csrf";

// ACTION TYPE CONSTANTS
export const RECEIVE_USER = 'user/RECEIVE_USER';
export const REMOVE_USER = 'user/REMOVE_USER';

// ACTIONS CREATORS

export const receiveUser = (user) => {
    return {
        type: RECEIVE_USER,
        user
    };
};

export const removeUser = (userId) => {
    return {
        type: REMOVE_USER,
        userId
    };
};

// THUNK ACTION CREATORS

const storeCSRFToken = response => {
    const csrfToken = response.headers.get('X-CSRF-Token');
    if (csrfToken) sessionStorage.setItem('X-CSRF-Token', csrfToken);
}

const storeCurrentUser = user => {
    if (user) {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        sessionStorage.removeItem('currentUser');
    }
}

export const restoreSession = () => async dispatch => {
    const res = await csrfFetch('/api/session');
    storeCSRFToken(res);
    let data = await res.json();
    storeCurrentUser(data.user);
    dispatch(receiveUser(data.user));
    return res;
}

export const signupUser = (user) => async dispatch => {
    let res = await csrfFetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    storeCurrentUser(data.user);
    // sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
    return res;
}

export const loginUser = (user) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'POST',
        body: JSON.stringify(user)
    });
    let data = await res.json();
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));
    dispatch(receiveUser(data.user));
    return res;
};

export const logoutUser = (userId) => async dispatch => {
    let res = await csrfFetch('/api/session', {
        method: 'DELETE'
    });
    sessionStorage.setItem('currentUser', null);
    dispatch(removeUser(userId));
    return res;
};


// REDUCER

const initialState = {
    user: JSON.parse(sessionStorage.getItem('currentUser'))
}

const sessionReducer = (state = initialState, action) => {
    Object.freeze(state);

    switch (action.type) {
        case RECEIVE_USER:
            return { ...state, user: action.user }
        case REMOVE_USER:
            return { ...state, user: null };
        default:
            return state;
    }
}

export default sessionReducer;