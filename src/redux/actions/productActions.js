import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR } from "../actionTypes/productActionTypes";
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        const { data } = await axios.get("http://localhost:5000/api/products/", { withCredentials: true })
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}

/* clearing errors */

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR, })
}