import axios from "axios";
import { ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_REQUEST, MY_ORDER_FAIL, MY_ORDER_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../actionTypes/orderTypes"

export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `https://modern-e-commerce-backend.vercel.app/api/order/new-order`;

        const { data } = await axios.post(link, order, config)
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}

// Get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });

        const { data } = await axios.get("https://modern-e-commerce-backend.vercel.app/api/order/admin", { withCredentials: true });

        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        });
    }
};





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
        let link = `https://modern-e-commerce-backend.vercel.app/api/order/my-orders`;

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
        let link = `https://modern-e-commerce-backend.vercel.app/api/order/${id}`;

        const { data } = await axios.get(link, config)
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }

}


export const updateOrder = (order, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `https://modern-e-commerce-backend.vercel.app/api/order/update/${id}`;

        const { data } = await axios.put(link, order, config)
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}


export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `https://modern-e-commerce-backend.vercel.app/api/order/delete/${id}`;

        const { data } = await axios.delete(link, config)
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })

    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }

}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}