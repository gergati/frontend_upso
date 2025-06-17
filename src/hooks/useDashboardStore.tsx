import { deleteClientes } from "@/services/dashboard/clientes/delete-clientes"
import { getClientById } from "@/services/dashboard/clientes/get-client-by-id"
import { getClientes } from "@/services/dashboard/clientes/get-cliente"
import { newClientes } from "@/services/dashboard/clientes/new-cliente"
import { updateClientes } from "@/services/dashboard/clientes/update-clientes"
import { getFacturaServicio } from "@/services/dashboard/facturaServicios/get-factura-servicios"
import { newFacturasServicio } from "@/services/dashboard/facturaServicios/new-facturas-servicios"
import { deleteProductos } from "@/services/dashboard/productos/delete-productos"
import { getProducts } from "@/services/dashboard/productos/get-productos"
import { newProductos } from "@/services/dashboard/productos/new-productos"
import { updateProductos } from "@/services/dashboard/productos/update-productos"
import { agregarCliente, agregarFacturas, agregarProducto, eliminarCliente, eliminarProducto, modificarClientes, modificarProductos, traerClientes, traerClientesPorId, traerFacturas, traerProductos } from "@/store/dashboard/dashboardSlice"
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
    producto_id?: string
    nombreProd: string;
    marca: string;
    precio: string;
    cantidad: string;
    descripcion: string
}

interface FacturaProps {
    servicio_id?: string;
    // facturaProd_id?: string;
    producto_id?: string;
    usuario_id?: string;
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

    const mostrarClientesPorId = async (cliente_id: string, usuario_id: string) => {
        try {
            if (!cliente_id) return;
            const response = await getClientById({ usuario_id, cliente_id })
            dispatch(traerClientesPorId(response))
        } catch (error) {
            console.error('Error al obtener al obtener cliente por id: ', error)
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
            if (!usuario_id) return
            const response = await getProducts(datos.usuario_id)
            dispatch(traerProductos(response))
        } catch (error) {
            console.error('Error al obtener los productos => ', error)
        }
    }

    const agregarNuevoProducto = async ({ usuario_id, cantidad, descripcion, marca, nombreProd, precio }: ProductoProps) => {
        try {
            if (!usuario_id) return;
            const response = await newProductos({ cantidad, descripcion, marca, nombreProd, precio, usuario_id })
            dispatch(agregarProducto(response))
        } catch (error) {
            console.log('Error al agregar producto => ', error)
        }

    }

    const modificarProductosPorId = async ({ producto_id, cantidad, descripcion, marca, nombreProd, precio }: ProductoProps) => {
        try {
            if (!producto_id) return;
            const response = await updateProductos({ usuario_id, producto_id, cantidad, descripcion, marca, nombreProd, precio })
            dispatch(modificarProductos(response))
        } catch (error) {
            console.log('Error al modificar los productos => ', error)
            throw error
        }
    }

    const eliminarProductoPorId = async ({ producto_id }: { producto_id: string }) => {
        try {
            if (!usuario_id) return;
            await deleteProductos({ usuario_id, producto_id })
            dispatch(eliminarProducto({ usuario_id, producto_id }))
        } catch (error) {
            console.error('Error al eliminar producto => ', error)
            throw error;
        }
    }

    /* Facturas */

    const mostrarFacturas = async () => {
        try {
            if (!usuario_id) return
            const response = await getFacturaServicio({ usuario_id })
            dispatch(traerFacturas(response))
        } catch (error) {
            console.error('Error al obtener las facturas => ', error)
        }
    }

    const agregarNuevaFactura = async ({ producto_id, servicio_id, usuario_id }: FacturaProps) => {
        try {
            if (servicio_id && usuario_id) {
                const response = await newFacturasServicio({ servicio_id, usuario_id })
                dispatch(agregarFacturas(response))
            } else if (producto_id) {
                console.log('producto_id', producto_id)
            }

        } catch (error) {
            console.error('Error al crear una nueva factura => ', error)
        }
    }



    return {
        clientes,
        productos,


        mostrarClientes,
        mostrarClientesPorId,
        agregarNuevoCliente,
        modificarClientePorId,
        eliminarClientePorId,

        mostrarProductos,
        agregarNuevoProducto,
        modificarProductosPorId,
        eliminarProductoPorId,

        mostrarFacturas,
        agregarNuevaFactura
    }
}