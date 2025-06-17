import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id?: string;
}

export const getFacturaServicio = async ({ usuario_id }: Props) => {
    if (!usuario_id) {
        console.error("Error: usuario_id es undefined o null");
        return null;
    }
    try {
        const token = localStorage.getItem('token');
        const response = await apiClient.get(`/usuario/${usuario_id}/facturaServicio/${1}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                user_id: `${usuario_id}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en facturaServicio:", error);
        return null;
    }
}