import { apiClient } from "@/services/apiClient";



export const getProducts = async (usuario_id?: string) => {
    if (!usuario_id) {
        console.error("Error: usuario_id es undefined o null");
        return null; 
    }

    try {
        const userId = usuario_id
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/usuario/${usuario_id}/productos`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en getProducts:", error);
        return null;
    }
}