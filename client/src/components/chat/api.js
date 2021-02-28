import {axiosRequest} from './../common/helper/hepler';

export const fetchChatInfoApi = async (token)=>{
    return await axiosRequest("GET","/api/get-chat",null,token)
}

export const createNewChannelApi = async (value,token)=>{
    return await axiosRequest("GET",`/api/create-channel/${value}`,null,token)
}

export const addMemberApi = async (value,token)=>{
    return await axiosRequest("GET",`/api/add-members/${value}`,null,token)
}