import { apiClient } from "@/services/apiClient";


export const getClientes = async (usuario_id: string) => {

    if (!usuario_id) return;
    try {
        const userId = usuario_id
        const token = localStorage.getItem('token')
        const response = await apiClient.get(`/usuario/${usuario_id}/clientes`, {
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