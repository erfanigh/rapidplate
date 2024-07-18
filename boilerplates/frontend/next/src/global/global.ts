import axios from "axios"
import { baseurl } from "./baseurl"

export const apiEndpoints = {
    auth: {
        login: '/auth/login',
        deleteCookie: '/auth/delete-cookie',
    },
}
export const _axios = axios.create({
    baseURL: baseurl,
    withCredentials: true,
})