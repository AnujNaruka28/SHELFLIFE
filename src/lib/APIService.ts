import axios from "axios"
import store from "./store";
const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if(token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

const APIMethods = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH",
} as const;

const APIService = async (url: string, method: typeof APIMethods[keyof typeof APIMethods], data?: Record<string, any>, queryParams?: Record<string, any>) => {
    return await axiosInstance({
        method,
        url,
        data,
        params: queryParams,
    })
}

export {
    APIService,
    APIMethods,
};