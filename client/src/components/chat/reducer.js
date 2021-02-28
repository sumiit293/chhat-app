import {
    FETCHING_CHAT_DATA_SUCCESS,
    FETCHING_CHAT_DATA_START,
    FETCHING_CHAT_DATA_ERROR,
    CREATE_CHANNEL_ERROR,
    CREATE_CHANNEL_START,
    CREATE_CHANNEL_SUCCESS
} from './action'

const initialState = {
    fetching: false,
    data: null,
    errMsg: null,
    creatingChannel: true,
    channelCreated: false
}

 const chatReducer = (state=initialState,action)=>{
    switch(action.type){

        case FETCHING_CHAT_DATA_START: {
            return {
                ...state,
                fetching: true,
            }
        }
        case FETCHING_CHAT_DATA_SUCCESS: {
            return {
                ...state,
                fetching: false,
                errMsg: null,
                data: action.info
            }
        }
        case FETCHING_CHAT_DATA_ERROR: {
            return {
                ...state,
                fetching: false,
                errMsg: null,
            }
        }
        case CREATE_CHANNEL_START: {
            return{
                ...state,
                creatingChannel: true
            }
        }
        case CREATE_CHANNEL_SUCCESS: {
            return{
                ...state,
                creatingChannel: false,
                data:{
                    ...state.data,
                    channels: [...state.data.channels,action.info]
                }
                
            }
        }
        case CREATE_CHANNEL_ERROR: {
            return{
                ...state,
                creatingChannel: false,
            }
        }
        default :{
            return {
                ...state
            }
        }
    }
}
export default chatReducer