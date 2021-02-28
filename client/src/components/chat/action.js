import {fetchChatInfoApi,createNewChannelApi,addMemberApi} from './api';
export const FETCHING_CHAT_DATA_START = "FETCHING_CHAT_DATA_START";
export const FETCHING_CHAT_DATA_ERROR = "FETCHING_CHAT_DATA_ERROR";
export const FETCHING_CHAT_DATA_SUCCESS = "FETCHING_CHAT_DATA_SUCCESS";

export const CREATE_CHANNEL_START = "CREATE_CHANNEL_START";
export const CREATE_CHANNEL_ERROR = "CREATE_CHANNEL_ERROR";
export const CREATE_CHANNEL_SUCCESS = "CREATE_CHANNEL_SUCCESS";

export const ADD_MEMBER_START = "ADD_MEMBER_START";
export const ADD_MEMBER_ERROR = "ADD_MEMBER_ERROR";
export const ADD_MEMBER_SUCCESS = "ADD_MEMBER_SUCCESS";

export const fetchChatData =  (token)=> async (dispatch)=>{

    try {
        dispatch({type: FETCHING_CHAT_DATA_START})
        const res = await fetchChatInfoApi(token);
        dispatch({type: FETCHING_CHAT_DATA_SUCCESS,info: res.data})
    } catch (error) {
        console.log(error)
        return !!error.response ? 
        dispatch({type: FETCHING_CHAT_DATA_ERROR,errMsg: error.response.data}):dispatch({type: FETCHING_CHAT_DATA_ERROR,errMsg: "Something went wrong"})
        
    }
}

export const createChannel =  (value,token)=> async (dispatch)=>{

    try {
        dispatch({type: CREATE_CHANNEL_START})
        const res = await createNewChannelApi(value,token);
        dispatch({type: CREATE_CHANNEL_SUCCESS,info: res.data})
    } catch (error) {
        console.log(error)
        return !!error.response ? 
        dispatch({type: CREATE_CHANNEL_ERROR,errMsg: error.response.data}):dispatch({type: CREATE_CHANNEL_ERROR,errMsg: "Something went wrong"})
        
    }
}

export const addUserToChannel = (value,token)=> async (dispatch)=>{
    try {
        dispatch({type: ADD_MEMBER_START})
        const res = await addMemberApi(value,token);
        dispatch({type: ADD_MEMBER_SUCCESS,info: res.data})
    } catch (error) {
        console.log(error)
        return !!error.response ? 
        dispatch({type: ADD_MEMBER_ERROR,errMsg: error.response.data}):dispatch({type: ADD_MEMBER_ERROR,errMsg: "Something went wrong"})
        
    }
}