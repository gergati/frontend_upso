import { checkToken, login, register } from "@/services/auth/auth";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "@/store/auth/authSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

interface Props {
    nombre: string;
    apellido: string;
    dni: string;
    email: string;
    telefono: string;
    contraseña: string;
    tipo: string
}


export const useAuthStore = () => {
    const { datos, status, errorMessage } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const startLogin = async (email: string, password: string) => {
        dispatch(onChecking())
        try {
            const data = await login(email, password)
            const { datos } = data;
            localStorage.setItem('token', datos.token)
            dispatch(onLogin(datos))
            navigate('/dashboard')
        } catch (error) {
            dispatch(onLogout())
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            return dispatch(onLogout());
        }

        try {
            const data = await checkToken();
            const { datos } = data;

            if (datos.newToken) {
                localStorage.setItem('token', datos.newToken);
            }

            dispatch(onLogin({
                ...datos,
                token: datos.newToken || token
            }));

        } catch (error) {
            console.error('Error durante la renovación del token:', error);
            localStorage.clear();
            dispatch(onLogout());
        }
    };


    const startRegister = async ({ nombre, apellido, dni, email, telefono, contraseña, tipo }: Props) => {
        dispatch(onChecking())
        try {
            const data = await register({ nombre, apellido, dni, email, telefono, contraseña, tipo })
            localStorage.setItem('token', data.token)
            dispatch(onLogin(data))
            navigate('/login')
        } catch (error) {
            dispatch(onLogout())
        }
    }

    const clearError = () => {
        dispatch(clearErrorMessage());
    };



    return {
        datos,
        status,
        errorMessage,

        startLogin,
        checkAuthToken,
        startRegister,
        clearError
    }
}