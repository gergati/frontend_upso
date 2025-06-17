import { Clientes } from "@/interfaces/clientes.interface";
import { FacturaProducto, FacturaServicio } from "@/interfaces/facturas.interface";
import { Products } from "@/interfaces/products.interfaces";
import { createSlice } from "@reduxjs/toolkit";

export type Factura = FacturaProducto | FacturaServicio

interface DashboardState {
    clientes: Clientes[];
    // servicios: [];
    productos: Products[];
    facturas: Factura[];
}

const initialState: DashboardState = {
    clientes: [],
    productos: [],
    facturas: [],
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        /* Clientes */
        traerClientes: (state, { payload }) => {
            state.clientes = payload;
        },
        traerClientesPorId: (state, { payload }) => {
            state.clientes = state.clientes.filter(c => c.cliente_id === payload.cliente_id)
        },
        agregarCliente: (state, { payload }) => {
            state.clientes.push(payload)
        },
        modificarClientes: (state, { payload }) => {
            state.clientes = state.clientes.map(cliente => {
                if (cliente.cliente_id === payload.cliente_id) {
                    return payload
                }
                return cliente
            })
        },
        eliminarCliente: (state, { payload }) => {
            state.clientes = state.clientes.filter((item) => item.cliente_id !== payload)
        },
        /* Productos */
        traerProductos: (state, { payload }) => {
            state.productos = payload;
        },
        agregarProducto: (state, { payload }) => {
            state.productos.push(payload)
        },
        modificarProductos: (state, { payload }) => {
            state.productos = state.productos.map(producto => {
                if (producto.producto_id === payload.producto_id) {
                    return payload
                }
                return producto
            })
        },
        eliminarProducto: (state, { payload }) => {
            state.productos = state.productos.filter((item) => item.producto_id !== payload)
        },
        /* Facturas */
        traerFacturas: (state, { payload }) => {
            state.facturas = payload
        },
        agregarFacturas: (state, { payload }) => {
            state.facturas.push(payload)
        },
        eliminarFacturas: (state, { payload }) => {
            state.facturas = state.facturas.filter((factura) => {
                if ('facturaServicio_id' in factura) {
                    return factura.facturaServicio_id !== payload.id;
                } else if ('facturaProd_id' in factura) {
                    return factura.facturaProd_id !== payload.id;
                }
                return true;
            });
        },
        clearDashboardData: (state) => {
            state.clientes = [];
            state.productos = [];
        },
    }
})


export const { traerClientes, modificarClientes, traerClientesPorId, agregarCliente, eliminarCliente, clearDashboardData, traerProductos, agregarProducto, modificarProductos, eliminarProducto, traerFacturas, agregarFacturas, eliminarFacturas } = dashboardSlice.actions;