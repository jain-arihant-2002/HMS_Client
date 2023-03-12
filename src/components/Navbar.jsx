import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import useAuth from "../hooks/useAuth";

/*  Navbar logic if no token then only heading with name "hms" else a vertical navbar */

const Navbar = () => {
    const { isDoctor, isAdmin, isPatient } = useAuth();

    const navbar = (
        <nav>
            {(isDoctor || isAdmin) && <Link to="/patient/view">View Patients</Link>}
            {(isPatient || isAdmin) && <Link to="/patient/add">Add Patient</Link>}
            {isAdmin && <Link to="/doctor/view">View Doctor</Link>}
            {isAdmin && <Link to="/doctor/add">Add Doctor</Link>}
            {(isPatient || isAdmin || isDoctor) && (
                <Link to="/prescription/view">View Prescriptions</Link>
            )}
            {(isDoctor || isAdmin) && <Link to="/prescription/add">Add Prescription</Link>}
            {(isPatient || isDoctor) && <Link to="/appointment/view">View Appointments</Link>}
            {(isPatient || isAdmin) && <Link to="/appointment/add">Add Appointment</Link>}
        </nav>
    );

    return navbar;
};

export default Navbar;
