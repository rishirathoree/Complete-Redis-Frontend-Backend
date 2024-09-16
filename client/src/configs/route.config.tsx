import { Navigate, Outlet } from "react-router-dom"
import Navbar from "../components/common/Navbar/Navbar";
import Sidebar from "../components/common/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "../stores/store";

const PrivateRoutes = () => {

  const { data } = useSelector((state: RootState) => state.auth.login)
  
  const isSidebarCollapsed = useSelector((state: RootState) => state.apps.sidebarCollapsed);

  return (
    data ? (
      <div className="flex">
        <Sidebar />
        <div className={`w-5/6 float-right h-screen overflow-y-auto ${isSidebarCollapsed ? 'w-full' : "w-5/6"}`}>
          <Navbar />
          <Outlet />
        </div>
      </div>
    ) : (
      <Navigate to="/login" />
    )
  )
}

export default PrivateRoutes