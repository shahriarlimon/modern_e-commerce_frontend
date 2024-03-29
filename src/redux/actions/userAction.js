import axios from "axios";
import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERROR, DELETE_USER_FAIL, DELETE_USER_REQUEST, DELETE_USER_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_FAIL, LOGOUT_SUCCESS, REGISTER_FAIL, REGISTER_REQUEST, REGISTER_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_USER_FAIL, UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS } from "../actionTypes/userActionTypes";
import { server } from "../store";

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
        let link = `${server}/user/login`;

        const { data } = await axios.post(link, { email, password }, config)
        dispatch({ type: LOGIN_SUCCESS, payload: data.user })
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error?.response?.data?.message
        })
    }

}
/* REGISTER */
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        }
        let link = `${server}/user/register`;

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
        let link = `${server}/user/me`;
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
        await axios.get(`${server}/user/logout`, {
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
        let link = `${server}/user/update-profile`;

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
        let link = `${server}/user/password/update`;

        const { data } = await axios.put(link, userData, config)
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
    }

}

// get All Users
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_USERS_REQUEST });
        const { data } = await axios.get(`${server}/user/admin`, { withCredentials: true });

        dispatch({ type: ALL_USERS_SUCCESS, payload: data.users });
    } catch (error) {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.message });
    }
};
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERROR })
}

// get  User Details
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`${server}/user/${id}`, { withCredentials: true });

        dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

// Update User
export const updateUser = (userData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });

        const config = { headers: { "Content-Type": "application/json" }, withCredentials: true };

        const { data } = await axios.put(
            `${server}/user/role/${id}`,
            userData,
            config
        );
        console.log(data.success)

        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Delete User
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`${server}/user/${id}`, { withCredentials: true });

        dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};
