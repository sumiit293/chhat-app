import { userLoginApi, userSignUpApi, checkAuthenticationApi } from './api';
import {notification} from 'antd'

export const FETCH_TOKEN_START = "FETCH_TOKEN_START";
export const FETCH_TOKEN_SUCCESS = "FETCH_TOKEN_SUCCESS";
export const FETCH_TOKEN_ERROR = "FETCH_TOKEN_ERROR";

export const DELETE_TOKEN_START = "DELETE_TOKEN_START";
export const DELETE_TOKEN_SUCCESS = "DELETE_TOKEN_SUCCESS";
export const DELETE_TOKEN_ERROR = "DELETE_TOKEN_ERROR";

export const TOKEN_VERYIFY_START = "TOKEN_VERYIFY_START";
export const TOKEN_VERYIFY_SUCCESS = "TOKEN_VERYIFY_SUCCESS";
export const TOKEN_VERYIFY_ERROR = "TOKEN_VERYIFY_ERROR";


export const fetchTokenStart = () => ({
    type: FETCH_TOKEN_START
});

export const fetchTokenError = (errMsg) => ({
    type: FETCH_TOKEN_ERROR,
    errMsg
});

export const fetchTokenSuccess = () => ({
    type: FETCH_TOKEN_SUCCESS
});

export const loginUser = (data) => async (dispatch) => {
    dispatch(fetchTokenStart());
    try {
        const res = await userLoginApi(data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authenticated",true)
        dispatch(fetchTokenSuccess());
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch(fetchTokenError(error.response.data.error));
            notification['error']({
                message: "ERROR !",
                description:error.response.data.error
              });
            return;
        }
        dispatch(fetchTokenError("Can't login now"));
        notification['error']({
            message: "ERROR !",
            description: 'Something went wrong could not log in now'
          });
    }
}

export const signupUser = (data) => async (dispatch) => {
    dispatch(fetchTokenStart());
    try {
        const res = await userSignUpApi(data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authenticated",true)
        dispatch(fetchTokenSuccess());
    } catch (error) {
        console.log(error);
        if (error.response && error.response.data) {
            dispatch(fetchTokenError(error.response.data.error));
            notification['error']({
                message: "ERROR !",
                description:error.response.data.error
              });
            return;
        }
        dispatch(fetchTokenError("Can't  signup now"));
        notification['error']({
            message: "ERROR !",
            description: 'Something went wrong could not signup now'
          });
        return;

    }
}

export const checkAuthentication = (token) => async (dispatch) => {
    try {
        const res = await checkAuthenticationApi(token)
        await localStorage.setItem("authenticated",true)
        dispatch({ type: TOKEN_VERYIFY_SUCCESS, user: res.data })
    } catch (error) {
        console.log(error)
        localStorage.removeItem("authenticated")
        dispatch({ type: TOKEN_VERYIFY_ERROR })
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: DELETE_TOKEN_START })
    try {
        await localStorage.removeItem("token");
        await localStorage.removeItem("authenticated")
        dispatch({ type: DELETE_TOKEN_SUCCESS })
    } catch (error) {
        console.log(error);
        dispatch({ DELETE_TOKEN_ERROR })
    }
}