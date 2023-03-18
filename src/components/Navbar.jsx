import {  NavLink ,Link} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logOut } from "../features/auth/authSlice";

const Navbar = () => {
    let { UserID, isDoctor, isAdmin, isPatient } = useAuth();

    if (isDoctor || isAdmin || isPatient) {
        const navbar = (
            <nav>
                {(isDoctor || isAdmin) && (
                    <NavLink activeClassName="active" to="/patient/view">
                        View Patients
                    </NavLink>
                )}
                {(isPatient || isAdmin) && !UserID && (
                    <NavLink activeClassName="active" to="/patient/add">
                        Add Patient
                    </NavLink>
                )}
                {isAdmin && (
                    <NavLink activeClassName="active" to="/doctor/view">
                        View Doctor
                    </NavLink>
                )}
                {isAdmin && (
                    <NavLink activeClassName="active" to="/doctor/add">
                        Add Doctor
                    </NavLink>
                )}
                {(isPatient || isAdmin || isDoctor) && (
                    <NavLink activeClassName="active" to="/prescription/view">
                        View Prescriptions
                    </NavLink>
                )}
                {isDoctor && (
                    <NavLink activeClassName="active" to="/prescription/add">
                        Add Prescription
                    </NavLink>
                )}
                {(isPatient || isDoctor || isAdmin) && (
                    <NavLink activeClassName="active" to="/appointment/view">
                        View Appointments
                    </NavLink>
                )}
                {(isPatient || isAdmin) && (
                    <NavLink activeClassName="active" to="/appointment/add">
                        Add Appointment
                    </NavLink>
                )}
                {(isDoctor || isAdmin || isPatient) && (
                    <Link
                        onClick={() => {
                            useDispatch(logOut());
                        }}
                    >
                        LogOut
                    </Link>
                )}
            </nav>
        );

        return navbar;
    }
};

export default Navbar;
