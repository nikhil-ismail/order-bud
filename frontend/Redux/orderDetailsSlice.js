import { SET_ADDRESS, SET_TIMING } from './constants';

// ACTIONS
export const setAddress = (payload) => {
    return {
        type: SET_ADDRESS,
        payload
    }
}

export const setTiming = (payload) => {
    return {
        type: SET_TIMING,
        payload
    }
}


// REDUCER
const initialState = [];
export const orderDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ADDRESS:
            return {
                ...state,
                address: action.payload
            }
        case SET_TIMING:
            return {
                ...state,
                timing: action.payload
            }
    }
    return state;
}


// SELECTOR
export const selectAddress = (state) => state.orderDetails.address;
export const selectTiming = (state) => state.orderDetails.timing;