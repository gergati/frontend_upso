import { apiClient } from "@/services/apiClient";


interface Props {
    usuario_id: string;
    cliente_id: string;
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    telefono: string;
    contraseña: string;
    fechaNac: string;
}

export const updateClientes = async ({ usuario_id, cliente_id, apellido, contraseña, dni, email, fechaNac, nombre, telefono }: Props) => {
    try {
        const userId = usuario_id
        const token = localStorage.getItem('token')
        const response = await apiClient.put(`/usuario/${usuario_id}/clientes/${cliente_id}`, { apellido, nombre, dni, email, telefono, contraseña, fechaNac }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        })

        return response.data
    } catch (error) {
        console.error('Error al actualizar el cliente => ', error)
        throw error;
    }
}