import { Outlet } from "react-router"

export const AuthLayout = () => {
    return (
        <div className="flex justify-center items-center w-full h-screen bg-gradient-to-r from-[#ECE9E6] to-[#FFFFFF]">
            <Outlet />
        </div>
    )
}
