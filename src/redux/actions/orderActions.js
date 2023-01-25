import axios from "axios";
import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_REQUEST, MY_ORDER_FAIL, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../actionTypes/orderTypes"

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/order/new-order`;

        const { data } = await axios.post(link, order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}






/* my orders */

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/order/my-orders`;

        const { data } = await axios.get(link, config)
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })

    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}
/* order details */

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/order/${id}`;

        const { data } = await axios.get(link, config)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}







export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}