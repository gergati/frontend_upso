import { apiClient } from "@/services/apiClient";


interface Props {
    usuario_id: string;
    servicio_id: string
}

export const newFacturasServicio = async ({ servicio_id, usuario_id }: Props) => {
    if (!usuario_id) {
        console.error("Error: usuario_id es undefined o null")
        return null
    }
    try {
        const response = await apiClient.post(`/facturaServicio`, { servicio_id, usuario_id })
        return response.data
    } catch (error) {
        console.error('Error al crear nueva factura => ', error)
        throw error
    }
}