import { getClientes } from "@/services/dashboard/clientes/get-cliente"
import { newClientes } from "@/services/dashboard/clientes/new-cliente"
import { getProducts } from "@/services/dashboard/productos/get-productos"
import { agregarCliente, traerClientes, traerProductos } from "@/store/dashboard/dashboardSlice"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"


interface Productos {
    usuario_id: string;
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaNac: string;
    telefono: string;
    contraseña: string
}


export const useDashboardStore = () => {

    const dispatch = useDispatch()
    const { datos } = useSelector((state: RootState) => state.auth)
    const { usuario_id } = datos;
    const { clientes, productos } = useSelector((state: RootState) => state.dashboard)


    const mostrarClientes = async () => {
        try {
            if (!usuario_id) return
            const response = await getClientes(datos.usuario_id)
            dispatch(traerClientes(response))
        } catch (error) {
            console.error("Error al obtener clientes:", error); 
        }
    }

    const agregarNuevoCliente = async ({ apellido, contraseña = '_', dni, email, fechaNac, nombre, telefono, usuario_id }: Productos) => {
        try {
            if (!datos.usuario_id) return
            const response = await newClientes({ apellido, contraseña, dni, email, fechaNac, nombre, telefono, usuario_id })
            dispatch(agregarCliente(response))
        } catch (error) {
            console.error('Error al agregar un nuevo cliente => ', error)
            throw error
        }
    }

    const mostrarProductos = async () => {
        try {
            if (!datos.usuario_id) return
            const response = await getProducts(datos.usuario_id)
            dispatch(traerProductos(response))
        } catch (error) {
            console.error('Error al obtener los productos => ', error)
        }
    }



    return {
        clientes,
        productos,


        mostrarClientes,
        agregarNuevoCliente,
        mostrarProductos,
    }
}