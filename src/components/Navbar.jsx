import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { logOut } from "../features/auth/authSlice";

const Navbar = () => {
    let { isDoctor, isAdmin, isPatient } = useAuth();

    if (isDoctor || isAdmin || isPatient) {
        const navbar = (
            <nav>
                {(isDoctor || isAdmin) && <Link to="/patient/view">View Patients</Link>}
                {(isPatient || isAdmin) && <Link to="/patient/add">Add Patient</Link>}
                {isAdmin && <Link to="/doctor/view">View Doctor</Link>}
                {isAdmin && <Link to="/doctor/add">Add Doctor</Link>}
                {(isPatient || isAdmin || isDoctor) && (
                    <Link to="/prescription/view">View Prescriptions</Link>
                )}
                {isDoctor && <Link to="/prescription/add">Add Prescription</Link>}
                {(isPatient || isDoctor || isAdmin) && (
                    <Link to="/appointment/view">View Appointments</Link>
                )}
                {(isPatient || isAdmin) && <Link to="/appointment/add">Add Appointment</Link>}
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
