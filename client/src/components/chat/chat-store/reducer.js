import {UPDATE_THE_CHAT} from './action';

const initialState = {

}

const ChatStateReducer = (state=initialState,action)=>{
    switch(action.type){
    
        case UPDATE_THE_CHAT: {
            return Object.assign({},state,{[action.key]: !!state[action.key]? [ ...state[action.key],action.value]:[action.value]})
        }
        default: {
            return {
                ...state
            }
        }
    }
}

export default ChatStateReducer