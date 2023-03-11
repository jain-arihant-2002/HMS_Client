import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);

    let role;

    if (token) {
        const decoded = jwtDecode(token);
        const { Role } = decoded.User;

        if (Role === "Patient") role = "Patient";
        else if (Role === "Doctor") role = "Doctor";
        else if (Role === "Admin") role = "Admin";
    }

    return role;
};
export default useAuth;
