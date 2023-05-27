import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';
const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
    },

}
const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk, logger)))
export default store;
export const server = "https://modern-ecommarce.web.app/api/v1"