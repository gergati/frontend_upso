import { apiClient } from "../apiClient"

interface Props {
    usuario_id: string;
    producto_id: number
}

export const deleteProductos = async ({ usuario_id, producto_id }: Props) => {
    try {
        const token = localStorage.getItem('token')
        const response = await apiClient.delete(`/usuario/${usuario_id}/productos/${producto_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar => ', error)
        throw error
    }
}