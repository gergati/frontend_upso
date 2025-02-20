import { Card } from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { LogoutIcon } from "./icons/LogoutIcon"
import { onLogout } from "@/store/auth/authSlice"
import { NavLink, useNavigate } from "react-router"
import { DashboardIcon } from "./icons/DashboardIcon"
import { UserIcon } from "./icons/UserIcon"
import { ProductsIcon } from "./icons/ProductsIcon"
import { TicketIcon } from "./icons/TicketIcon"
import { ServiciosIcon } from "./icons/ServiciosIcon"



export const SidebarDashboard = () => {
    const dispatch = useDispatch()
    const { datos } = useSelector((state: RootState) => state.auth)
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(onLogout())
        navigate('/login')
    }


    return (
        <div className="font-rubik ">
            <aside className="" >
                <div className="px-3 py-4 bg-gray-50 dark:bg-gray-800 min-h-screen">
                    <div className="flex flex-col">
                        <span className=" text-[40px] font-title">Nico</span>
                        <span className=" text-3xl font-title">Administraciones</span>
                    </div>
                    <Card className="w-full h-[50px] text-xs flex items-center justify-center m-auto my-5">
                        <div className="flex items-center justify-center gap-4">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.pngs" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <p className="font-bold">{datos.nombre} {datos.apellido}</p>
                                <span className="text-black/75">{datos.email}</span>
                            </div>
                        </div>
                    </Card>
                    <ul className="space-y-2">
                        <li>
                            <NavLink to="dashboard"
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "black",
                                })}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <DashboardIcon />
                                <span className="ml-3 font-bold">Dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='clientes'
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "black",
                                })}
                                className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <UserIcon />
                                <span className="ml-3 whitespace-nowrap font-bold" >Clientes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='productos'
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "black",
                                })}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <ProductsIcon />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold">Productos</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='servicios'
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "black",
                                })}
                                className="flex items-center w-full p-2 text-base font-normal text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                                <ServiciosIcon />
                                <span className="ml-3 whitespace-nowrap font-bold" >Servicios</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to='facturas'
                                style={({ isActive }) => ({
                                    color: isActive ? "red" : "black",
                                })}
                                className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <TicketIcon />
                                <span className="flex-1 ml-3 whitespace-nowrap font-bold">Facturas</span>
                            </NavLink>
                        </li>
                        <li>
                            <button
                                onClick={handleLogout}
                                className="flex w-full hover:cursor-pointer items-center p-2 bg-red-500 text-base font-normal rounded-lg text-white hover:bg-red-700">
                                <LogoutIcon />
                                <span className="ml-3 whitespace-nowrap">Salir</span>
                            </button>
                        </li>
                    </ul>
                    <Card className="w-full h-[100px] my-2">

                    </Card>
                </div>
            </aside>
        </div>
    )
}
