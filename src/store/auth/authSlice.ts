import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        datos: {
            usuario_id: '',
            nombre: '',
            apellido: '',
            dni: '',
            telefono: '',
            categoria: '',
            email: ''
        },
        token: null,
        errorMessage: null,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.datos = {
                usuario_id: '',
                nombre: '',
                apellido: '',
                dni: '',
                telefono: '',
                categoria: '',
                email: ''
            };
            state.token = null;
            state.errorMessage = null;
        },
        onLogin: (state, { payload }) => {
            state.status = 'authenticated';
            state.datos = {
                usuario_id: payload.usuario_id,
                nombre: payload.nombre,
                apellido: payload.apellido,
                dni: payload.dni,
                telefono: payload.telefono,
                categoria: payload.categoria,
                email: payload.email
            };
            state.token = payload.token;
            state.errorMessage = null;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.datos = {
                usuario_id: '',
                nombre: '',
                apellido: '',
                dni: '',
                telefono: '',
                categoria: '',
                email: ''
            };
            state.token = null;
        },
        clearErrorMessage: (state) => {
            state.errorMessage = null
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage } = authSlice.actions;
