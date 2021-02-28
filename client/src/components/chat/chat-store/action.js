export const UPDATE_THE_CHAT = "UPDATE_THE_CHAT"

export const updateChat = (key,value)=> async (dispatch)=>{
    dispatch({type: UPDATE_THE_CHAT,key,value})
}