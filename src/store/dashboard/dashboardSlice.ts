import { Clientes } from "@/interfaces/clientes.interface";
import { Products } from "@/interfaces/products.interfaces";
import { createSlice } from "@reduxjs/toolkit";

interface DashboardState {
    clientes: Clientes[];
    // servicios: [];
    productos: Products[];
    // facturas: [];
}

const initialState: DashboardState = {
    clientes: [],
    productos: [],
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        traerClientes: (state, { payload }) => {
            state.clientes = payload;
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
        traerProductos: (state, { payload }) => {
            state.productos = payload;
        },
        clearDashboardData: (state) => {
            state.clientes = [];
            // state.services = [];
            state.productos = [];
        },

    }
})


export const { traerClientes, modificarClientes, agregarCliente, eliminarCliente, clearDashboardData, traerProductos, } = dashboardSlice.actions;