import { FETCH_TOKEN_START, FETCH_TOKEN_SUCCESS, FETCH_TOKEN_ERROR, TOKEN_VERYIFY_START, TOKEN_VERYIFY_SUCCESS, TOKEN_VERYIFY_ERROR, DELETE_TOKEN_SUCCESS } from "./action";

const initialState = {
    isLoading: false,
    loggedInUser: false,
    errMsg: "",
    user: {}
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TOKEN_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case FETCH_TOKEN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                loggedInUser: true,
            }
        }
        case FETCH_TOKEN_ERROR: {
            return {
                ...state,
                isLoading: true,
                errMsg: action.errMsg,
            }
        }
        case TOKEN_VERYIFY_START: {
            return {
                ...state,
                isLoading: true,
                user: {}
            }
        }
        case TOKEN_VERYIFY_ERROR: {
            return {
                ...state,
                isLoading: false,
                loggedInUser: false,
                user: {}
            }
        }
        case TOKEN_VERYIFY_SUCCESS: {
            return {
                ...state,
                isLoading: true,
                loggedInUser: true,
                user: action.user
            }
        }
        case DELETE_TOKEN_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                loggedInUser: false,
                user: {}
            }
        }
        default: {
            return {
                ...state,
            };
        }
    }
};
export default loginReducer;