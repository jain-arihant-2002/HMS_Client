import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import jwtDecode from "jwt-decode";

const useAuth = () => {
    const token = useSelector(selectCurrentToken);
    
    if (token) {
        const decoded = jwtDecode(token);
        const {UserID, Role } = decoded.User;
        let isPatient = false;
        let isDoctor = false;
        let isAdmin = false;
        if (Role === "Patient") isPatient = true;
        else if (Role === "Doctor") isDoctor = true;
        else if (Role === "Admin") isAdmin = true;

        return { isDoctor, isAdmin, isPatient ,Role,UserID};
    }
    return { isDoctor: false, isAdmin: false, isPatient: false,UserID:null };
};
export default useAuth;
