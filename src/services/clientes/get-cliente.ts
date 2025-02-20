import { apiClient } from "../apiClient";

export const getClientes = async (usuario_id: string) => {
    if (!usuario_id) return;

    try {
        const token = localStorage.getItem('token')
        const response = await apiClient.get(`/usuario/${usuario_id}/clientes`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return response.data
    } catch (error) {
        console.error("❌ Error en getClientes:", error);
        return null;
    }
}