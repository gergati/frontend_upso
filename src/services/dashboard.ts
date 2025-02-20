import { apiClient } from "./apiClient";


export const getProducts = async (usuario_id?: string) => {
    if (!usuario_id) {
        console.error("❌ Error: usuario_id es undefined o null");
        return null; // Retorna null en lugar de hacer la petición
    }

    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/usuario/${usuario_id}/productos`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // user_id: `${usuario_id}`
            }
        });
        console.log("📌 Respuesta de la API:", response.data);  // Agrega este log
        return response.data;
    } catch (error) {
        console.error("❌ Error en getProducts:", error);
        return null; // En lugar de lanzar error, retorna null para evitar que la app se rompa
    }
}


export const getFacturaServicio = async (usuario_id?: string) => {
    if (!usuario_id) {
        console.error("❌ Error: usuario_id es undefined o null");
        return null; // Retorna null en lugar de hacer la petición
    }
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/usuario/${usuario_id}/facturaServicio`, {
            headers: {
                Authorization: `Bearer ${token}`,
                // user_id: `${usuario_id}`
            }
        });
        console.log("📌 Respuesta de la API:", response.data);  // Agrega este log
        return response.data;
    } catch (error) {
        console.error("❌ Error en facturaServicio:", error);
        return null; // En lugar de lanzar error, retorna null para evitar que la app se rompa
    }
}