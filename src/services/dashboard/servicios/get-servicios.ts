import { apiClient } from "@/services/apiClient"


export const getServicios = async (usuario_id: string) => {

    if (!usuario_id) return
    try {
        const token = localStorage.getItem('token')
        const userId = usuario_id
        const response = await apiClient.get(`/usuario/${usuario_id}/servicios`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        })

        return response.data
    } catch (error) {
        console.error("❌ Error en getClientes:", error);
        return null;
    }
}