import { deleteClientes } from "@/services/dashboard/clientes/delete-clientes"
import { getClientes } from "@/services/dashboard/clientes/get-cliente"
import { newClientes } from "@/services/dashboard/clientes/new-cliente"
import { updateClientes } from "@/services/dashboard/clientes/update-clientes"
import { getProducts } from "@/services/dashboard/productos/get-productos"
import { newProductos } from "@/services/dashboard/productos/new-productos"
import { updateProductos } from "@/services/dashboard/productos/update-productos"
import { agregarCliente, agregarProducto, eliminarCliente, modificarClientes, modificarProductos, traerClientes, traerProductos } from "@/store/dashboard/dashboardSlice"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"


interface ClienteProps {
    usuario_id: string;
    cliente_id?: string;
    apellido: string;
    nombre: string;
    dni: string;
    email: string;
    fechaNac: string;
    telefono: string;
    contraseña: string
}

interface ProductoProps {
    usuario_id: string;
    producto_id: string
    nombreProd: string;
    marca: string;
    precio: string;
    cantidad: string;
    descripcion: string
}



export const useDashboardStore = () => {

    const dispatch = useDispatch()
    const { datos } = useSelector((state: RootState) => state.auth)
    const { usuario_id } = datos;
    const { clientes, productos } = useSelector((state: RootState) => state.dashboard)

    /* Clientes */

    const mostrarClientes = async () => {
        try {
            if (!usuario_id) return
            const response = await getClientes(datos.usuario_id)
            dispatch(traerClientes(response))
        } catch (error) {
            console.error("Error al obtener clientes:", error);
        }
    }

    const agregarNuevoCliente = async ({ apellido, contraseña = '_', dni, email, fechaNac, nombre, telefono, usuario_id }: ClienteProps) => {
        try {
            if (!datos.usuario_id) return
            const response = await newClientes({ apellido, contraseña, dni, email, fechaNac, nombre, telefono, usuario_id })
            dispatch(agregarCliente(response))
        } catch (error) {
            console.error('Error al agregar un nuevo cliente => ', error)
            throw error
        }
    }

    const modificarClientePorId = async ({ usuario_id, cliente_id, apellido, contraseña = '_', dni, email, fechaNac, nombre, telefono }: ClienteProps) => {
        try {
            if (!cliente_id) return;
            const response = await updateClientes({ usuario_id, cliente_id, apellido, contraseña, dni, email, fechaNac, nombre, telefono })
            dispatch(modificarClientes(response))
        } catch (error) {
            console.error('Error al actulizar el cliente => ', error)
        }
    }

    const eliminarClientePorId = async ({ cliente_id }: { cliente_id: string }) => {
        try {
            if (!usuario_id) return;
            await deleteClientes({ usuario_id, cliente_id })
            dispatch(eliminarCliente(cliente_id))
        } catch (error) {
            console.error('Error al eliminar cliente => ', error)
            throw error;
        }

    }

    /* Productos */

    const mostrarProductos = async () => {
        try {
            if (!datos.usuario_id) return
            const response = await getProducts(datos.usuario_id)
            dispatch(traerProductos(response))
        } catch (error) {
            console.error('Error al obtener los productos => ', error)
        }
    }

    const agregarNuevoProducto = async ({ usuario_id, cantidad, descripcion, marca, nombreProd, precio }: ProductoProps) => {
        try {
            if (!datos.usuario_id) return;
            const response = await newProductos({ cantidad, descripcion, marca, nombreProd, precio, usuario_id })
            dispatch(agregarProducto(response))
        } catch (error) {
            console.log('Error al agregar producto => ', error)
        }

    }

    const modificarProductosPorId = async ({ usuario_id, producto_id, cantidad, descripcion, marca, nombreProd, precio }: ProductoProps) => {
        try {
            if (!usuario_id) return
            const response = await updateProductos({ usuario_id, producto_id, cantidad, descripcion, marca, nombreProd, precio })
            dispatch(modificarProductos(response))
        } catch (error) {
            console.log('Error al modificar los productos => ', error)
            throw error
        }
    }



    return {
        clientes,
        productos,


        mostrarClientes,
        agregarNuevoCliente,
        modificarClientePorId,
        eliminarClientePorId,
        mostrarProductos,
        agregarNuevoProducto,
        modificarProductosPorId
    }
}