import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { onLogout } from "@/store/auth/authSlice";
import { NavLink, useNavigate } from "react-router";
import { DashboardIcon } from "./icons/DashboardIcon";
import { UserIcon } from "./icons/UserIcon";
import { ProductsIcon } from "./icons/ProductsIcon";
import { ServiciosIcon } from "./icons/ServiciosIcon";
import { clearDashboardData } from "@/store/dashboard/dashboardSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react"; // Ícono hamburguesa

export const SidebarDashboard = () => {
    const dispatch = useDispatch();
    const { datos } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        dispatch(clearDashboardData());
        dispatch(onLogout());
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="font-rubik">
            <div className="sm:hidden p-4">
                <Button variant="outline" onClick={() => setIsOpen(!isOpen)}>
                    <Menu />
                </Button>
            </div>

            <aside
                className={`
          fixed z-50 top-0 left-0 h-full w-64 bg-gray-50 dark:bg-gray-800 transition-transform transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          sm:translate-x-0 sm:static sm:w-64
        `}
            >
                <div className="px-4 py-6 min-h-screen flex flex-col justify-between">
                    <div>
                        <div className="mb-6">
                            <span className="text-[40px] font-title block">Nico</span>
                            <span className="text-3xl font-title block">Administraciones</span>
                        </div>

                        <Card className="mb-6">
                            <div className="flex items-center gap-4 p-2">
                                <Avatar>
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-bold text-[14px]">{datos.nombre} {datos.apellido}</p>
                                    <span className="text-black/75 text-sm">{datos.email}</span>
                                </div>
                            </div>
                        </Card>

                        <ul className="space-y-2">
                            {[
                                { to: "dashboard", icon: <DashboardIcon />, label: "Dashboard" },
                                { to: "clientes", icon: <UserIcon />, label: "Clientes" },
                                { to: "productos", icon: <ProductsIcon />, label: "Productos" },
                                { to: "servicios", icon: <ServiciosIcon />, label: "Servicios" },
                            ].map(({ to, icon, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        onClick={() => setIsOpen(false)}
                                        className={({ isActive }) =>
                                            `flex items-center p-2 text-base font-bold rounded-lg ${isActive ? "text-red-600" : "text-gray-900 dark:text-white"
                                            } hover:bg-gray-100 dark:hover:bg-gray-700`
                                        }
                                    >
                                        {icon}
                                        <span className="ml-3 whitespace-nowrap">{label}</span>
                                    </NavLink>
                                </li>
                            ))}
                            <li>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700 text-white hover:text-gray-300 hover:cursor-pointer"
                                            variant="outline"
                                        >
                                            Salir
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="font-rubik">
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Tenés que volver a loguearte.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel className="hover:cursor-pointer">Cancelar</AlertDialogCancel>
                                            <AlertDialogAction className="bg-red-500 hover:bg-red-700 text-white hover:text-gray-300 hover:cursor-pointer" onClick={handleLogout}>Salir</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </li>
                        </ul>
                    </div>

                    <Card className="h-[100px] my-2" />
                </div>
            </aside>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 sm:hidden z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </div>
    );
};
