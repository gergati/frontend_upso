import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id: string;
    cliente_id: string;
}

export const deleteClientes = async ({ cliente_id, usuario_id }: Props) => {
    try {
        const userId = usuario_id
        const token = localStorage.getItem('token')
        const response = await apiClient.delete(`/usuario/${usuario_id}/clientes/${cliente_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId,
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar clientes => ', error)
        throw error
    }
}