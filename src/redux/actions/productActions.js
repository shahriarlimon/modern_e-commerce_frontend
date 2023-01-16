import { ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERROR, PRODUCT_DETAILS_FAIL, PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS } from "../actionTypes/productActionTypes";
import axios from 'axios'

export const getProducts = (keyword = "", currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let link = `http://localhost:5000/api/products?keyword=${keyword}&page=${currentPage}`
        const { data } = await axios.get(link, { withCredentials: true })
        dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`, { withCredentials: true })
        dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}


/* clearing errors */

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR, })
}