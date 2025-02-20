import { apiClient } from "../apiClient"

interface Props {
    usuario_id: string;
    nombreProd: string;
    marca: string;
    precio: string;
    cantidad: string;
    descripcion: string;
}

export const newProductos = async ({ cantidad, descripcion, marca, nombreProd, precio, usuario_id }: Props) => {
    try {
        const response = await apiClient.post('/productos', { usuario_id, nombreProd, marca, precio, cantidad, descripcion })
        return response.data
    } catch (error) {
        console.error('Error creating products:', error);
        throw error;
    }
}