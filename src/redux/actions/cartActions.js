import axios from "axios";
import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../actionTypes/cartTypes";


export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    }
    let link = `https://modern-e-commerce-backend.vercel.app/api/products/${id}`;

    const { data } = await axios.get(link, config)
    dispatch({
        type: ADD_TO_CART, payload: {
            ...data.product,
            image: data.product.images[0].url,
            stock: data.product.stock,
            quantity
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: id,
    });

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

/* saving shipping information */
export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data
    })
}