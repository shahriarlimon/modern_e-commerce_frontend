import axios from "axios";
import { CLEAR_ERROR, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS } from "../actionTypes/userActionTypes";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/user/login`;

        const { data } = await axios.post(link, { email, password }, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }

}

export const register = (userData) => async (dispatch) => {
    console.log(userData)
    try {
        dispatch({ type: REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/user/register`;

        const { data } = await axios.post(link, userData, config)
        dispatch({ type: REGISTER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.message
        })
    }

}




export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}