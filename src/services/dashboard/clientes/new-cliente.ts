import { apiClient } from "@/services/apiClient";

interface Props {
    usuario_id: string;
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    telefono: string;
    contraseña: string
    fechaNac: string
}

export const newClientes = async ({ apellido, contraseña, dni, email, fechaNac, nombre, telefono, usuario_id }: Props) => {

    try {

        const response = await apiClient.post('/clientes', {
            apellido, contraseña, dni, email, fechaNac, nombre, telefono, usuario_id
        })
        return response.data

    } catch (error) {
        console.error('Error al crear un cliente nuevo => ', error)
    }

}