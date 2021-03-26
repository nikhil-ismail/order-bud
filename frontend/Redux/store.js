import { createStore, combineReducers } from 'redux';

import { cartItemsReducer } from './cartSlice'

const reducers = combineReducers({
    cartItems: cartItemsReducer
})

const store = createStore(reducers);

export default store;