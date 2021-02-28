import { axiosRequest } from './../common/helper/hepler';

export const userLoginApi = async (value) => {
    return await axiosRequest("POST", `/api/signin`, value);
};


export const userSignUpApi = async (value) => {
    return await axiosRequest("POST", `/api/signup`, value,null);
};

export const checkAuthenticationApi = async (value) => {
    return await axiosRequest("GET", `/api/test`, null, value);
};