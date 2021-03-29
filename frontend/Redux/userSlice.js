import { SET_USER, CLEAR_USER } from './constants';

// ACTIONS
export const setUser = (payload) => {
    return {
        type: SET_USER,
        payload
    }
}

export const clearUser = () => {
    return {
        type: CLEAR_USER
    }
}


// REDUCER
const initialState = [];
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return [...state, action.payload]
        case CLEAR_USER:
            return state = [];
    }
    return state;
}


// SELECTOR
export const selectIsLoggedIn = (state) => state.userDetails.length > 0;
export const selectUserDetails = (state) => state.userDetails[0].user;