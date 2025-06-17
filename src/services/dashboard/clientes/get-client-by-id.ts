import { apiClient } from "@/services/apiClient";


interface Props {
    usuario_id: string;
    cliente_id: string
}


export const getClientById = async ({ cliente_id, usuario_id }: Props) => {
    if (!cliente_id || !usuario_id) return;
    try {
        const token = localStorage.getItem('token')

        const response = await apiClient.get(`/usuario/${usuario_id}/clientes/${cliente_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": usuario_id,
            }
        })

        return response.data;

    } catch (error) {
        console.error('Error al traer el cliente con id => ', error)
        throw error;
    }
}