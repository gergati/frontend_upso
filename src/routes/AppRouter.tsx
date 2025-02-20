
import { AuthLayout } from '@/auth/layout/AuthLayout'
import { Login } from '@/auth/pages/Login'
import { Register } from '@/auth/pages/Register'
import { DashboardLayout } from '@/dashboard/layout/DashboardLayout'
import { Facturas } from '@/dashboard/pages/Facturas'
import { Home } from '@/dashboard/pages/Home'
import { Productos } from '@/dashboard/pages/Productos'
import { Settings } from '@/dashboard/pages/Settings'
import { Clientes } from '@/dashboard/pages/Clientes'
import { useAuthStore } from '@/hooks/useAuthStore'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { Servicios } from '@/dashboard/pages/Servicios'


export const AppRouter = () => {
    const { status, checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }


    return (
        <Routes>

            {
                status === 'authenticated' ? (
                    <>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<Home />} />
                            {/* <Route path='dashboard' element={<Home />} /> */}
                            <Route path='facturas' element={<Facturas />} />
                            <Route path='clientes' element={<Clientes />} />
                            <Route path="settings" element={<Settings />} />
                            <Route path="productos" element={<Productos />} />
                            <Route path="servicios" element={<Servicios />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </>
                ) : (
                    <>
                        <Route element={<AuthLayout />}>
                            <Route path="login" element={<Login />} />
                            <Route path="register" element={<Register />} />
                        </Route>
                        <Route path="*" element={<Navigate to="/login" />} />
                    </>
                )
            }
        </Routes>
    )
}
