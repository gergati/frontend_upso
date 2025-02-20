import { Outlet } from "react-router"
import { SidebarDashboard } from "../components/sidebar-dashboard"


export const DashboardLayout = () => {
    return (
        <div className="w-full bg-gray-50 min-h-screen flex">
            <div className="w-72 min-h-screen">
                <SidebarDashboard />
            </div>
            <div className="m-1 p-4 w-[99%] rounded-xl bg-gray-200">
                <Outlet />
            </div>
        </div>
    )
}
