import { apiClient } from "@/services/apiClient";


interface Props {
    usuario_id: string;
    producto_id: string
    nombreProd: string;
    marca: string;
    precio: string;
    cantidad: string;
    descripcion: string
}

export const updateProductos = async ({ usuario_id, producto_id, cantidad, descripcion, marca, nombreProd, precio }: Props) => {
    try {
        const userId = usuario_id
        const token = localStorage.getItem('token')
        const response = await apiClient.put(`/usuario/${usuario_id}/productos/${producto_id}`, { nombreProd, marca, precio, cantidad, descripcion }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "user-id": userId
            }
        })
        return response.data
    } catch (error) {
        console.error('Error al actualizar el producto => ', error)
        throw error;
    }
}