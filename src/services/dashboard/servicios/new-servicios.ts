import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id: string;
    cliente_id: string;
    nombreServicio: string;
    fecha: string;
    hora: string;
    precio: string;
}

export const newServicios = async ({ fecha, cliente_id, hora, nombreServicio, usuario_id, precio }: Props) => {

    try {
        const response = await apiClient.post('/servicios', { usuario_id, cliente_id, nombreServicio, fecha, hora, precio })
        return response.data
    } catch (error) {
        console.error('Error al crear servicios => ', error)
        throw error
    }
}