import axios from "axios";


export const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:4500/',
    headers: {
        'Content-Type': 'application/json'
    }
})