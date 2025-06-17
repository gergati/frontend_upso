import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id: string;
    producto_id: string
}

export const deleteProductos = async ({ usuario_id, producto_id }: Props) => {
    try {
        const userId = usuario_id
        const token = localStorage.getItem('token')
        const response = await apiClient.delete(`/usuario/${usuario_id}/productos/${producto_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar productos => ', error)
        throw error
    }
}