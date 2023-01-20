import axios from "axios";
import { LOGOUT_FAIL, LOGOUT_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS } from "../actionTypes/productActionTypes";
import { CLEAR_ERROR, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../actionTypes/userActionTypes";
/* LOGIN */
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
/* REGISTER */
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


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        let link = `http://localhost:5000/api/user/me`;
        const { data } = await axios.get(link, {
            withCredentials: true
        })
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }

}

/* LOGOUT USER */
// Logout User
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`http://localhost:5000/api/user/logout`, {
            withCredentials: true
        });
        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }
};

/* update profile*/
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/user/update-profile`;

        const { data } = await axios.put(link, userData, config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response.data.message
        })
    }

}
/* update PASSWORD*/
export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }
        let link = `http://localhost:5000/api/user/password/update`;

        const { data } = await axios.put(link, userData, config)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }

}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}