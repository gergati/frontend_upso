import { apiClient } from "./apiClient";


// interface Props {
//     username: string,
//     password: string
// }

export const login = async (username: string, password: string) => {
    try {
        const response = await apiClient.post('/login', { username, password })
        return response.data

    } catch (error) {
        console.error('Error logging in: ', error);
        throw error;
    }
}


export const checkToken = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get('/renew', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data

    } catch (error) {
        console.error('Error token: ', error);
        throw error;
    }
}