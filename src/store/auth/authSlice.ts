import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking',
        datos: { usuario_id: '', nombre: '', apellido: '', dni: '', telefono: '', categoria: '', email: '' },
        token: null,
        errorMessage: undefined,
    },
    reducers: {
        onChecking: (state) => {
            state.status = 'checking';
            state.datos = { usuario_id: '', nombre: '', apellido: '', dni: '', telefono: '', categoria: '', email: '' };
            state.token = null;
            state.errorMessage = undefined;
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
            state.errorMessage = undefined;
        },
        onLogout: (state) => {
            state.status = 'not-authenticated';
            state.datos = { usuario_id: '', nombre: '', apellido: '', dni: '', telefono: '', categoria: '', email: '' };
            state.token = null;
            state.errorMessage = undefined;
        },
    }
});

export const { onChecking, onLogin, onLogout } = authSlice.actions;
