import { apiClient } from "@/services/apiClient"

interface Props {
    usuario_id: string;
    servicio_id: string
}


export const deletefacturaServicios = async ({ usuario_id, servicio_id }: Props) => {
    try {
        const token = localStorage.getItem('token')
        const userId = usuario_id
        const response = await apiClient.delete(`/usuario/${usuario_id}/servicios/${servicio_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al eliminar el servicio => ', error)
        throw error;
    }
}