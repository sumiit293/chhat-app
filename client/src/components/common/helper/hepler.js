/** @format */
import Axios from "axios";

export async function axiosRequest(method, url, data = null, token = null) {
    let URL = `http://localhost:4000${url}`;
    return Axios({
        method: method,
        url: URL,
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        data: data
    })
    .then((res) => res)
    .catch((err) => {
        throw err;
    });
}

export const dispatchErrorAction = (error, func, dispatch) => {
    if (!!error && !!error.response && !!error.response.data) {
        return dispatch(func(error.response.data));
    }
}
