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
const initialState = {};
export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                auth: action.payload.auth,
                accessToken: action.payload.accessToken,
                details: {
                    ...state.details,
                    id: action.payload.user.id,
                    address: action.payload.user.address,
                    email: action.payload.user.email,
                    isAdmin: action.payload.user.isAdmin,
                    name: action.payload.user.name,
                    phone: action.payload.user.phone
                }
            }
        case CLEAR_USER:
            return state = {};
    }
    return state;
}


// SELECTOR
export const selectIsLoggedIn = (state) => Object.keys(state.userDetails).length !== 0;
export const selectUserDetails = (state) => state.userDetails.details;
export const selectUserId = (state) => state.userDetails.details.id;
export const selectIsAdmin = (state) => state.userDetails.details.isAdmin;