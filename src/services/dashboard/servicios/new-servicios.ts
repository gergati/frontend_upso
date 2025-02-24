import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id: string;
    nombreServicio: string;
    fecha: string;
    hora: string
}

export const newServicios = async ({ fecha, hora, nombreServicio, usuario_id }: Props) => {

    try {
        const response = await apiClient.post('/servicios', { usuario_id, nombreServicio, fecha, hora })
        return response.data
    } catch (error) {
        console.error('Error al crear servicios => ', error)
        throw error
    }
}