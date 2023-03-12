import { useLocation, Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({ allowedRoles }) => {
    const location = useLocation()
    const { Role } = useAuth()

    const content = (
        allowedRoles.includes(Role)
            ? <Outlet />
            : <Navigate to="/" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth