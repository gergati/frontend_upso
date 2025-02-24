
import { checkToken, login } from "@/services/auth/auth";
import { onChecking, onLogin, onLogout } from "@/store/auth/authSlice";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";



export const useAuthStore = () => {
    const { datos, status, errorMessage } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const startLogin = async (username: string, password: string) => {
        dispatch(onChecking())
        try {
            const data = await login(username, password)
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
            console.log('No token found, logging out...');
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



    return {
        datos,
        status,
        errorMessage,

        startLogin,
        checkAuthToken
    }
}