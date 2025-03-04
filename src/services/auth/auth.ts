interface Props {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    contraseña: string;
    tipo: string
}

import { apiClient } from "../apiClient";

export const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post('/login', { email, password })
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


export const register = async ({ nombre, apellido, dni, email, telefono, contraseña, tipo }: Props) => {
    try {
        const response = await apiClient.post(`/usuario`, { nombre, apellido, dni, email, telefono, contraseña, tipo })
        return response.data
    } catch (error) {
        console.error('Error al crear nuevo usuario => ', error)
        throw error
    }
}