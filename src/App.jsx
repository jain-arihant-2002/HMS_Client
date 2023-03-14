import { Routes, Route,Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/register/Register";
import RequireAuth from "./features/auth/RequireAuth";

import ViewPatient from "./features/patient/ViewPatient";
import RegisterPatient from "./features/patient/RegisterPatient";
import UpdatePatient from "./features/patient/UpdatePatient";
import DeletePatient from "./features/patient/DeletePatient";

import ViewDoctor from "./features/doctor/ViewDoctor";
import RegisterDoctor from "./features/doctor/RegisterDoctor";
import UpdateDoctor from "./features/doctor/UpdateDoctor";
import DeleteDoctor from "./features/doctor/DeleteDoctor";

import ViewAppointment from "./features/appointment/ViewAppointment";
import RegisterAppointment from "./features/appointment/RegisterAppointment";
import UpdateAppointment from "./features/appointment/UpdateAppointment";
import DeleteAppointment from "./features/appointment/DeleteAppointment";

import ViewPrescription from "./features/prescription/ViewPrescription";
import RegisterPrescription from "./features/prescription/RegisterPrescription";
import UpdatePrescription from "./features/prescription/UpdatePrescription";
import DeletePrescription from "./features/prescription/DeletePrescription";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                /* Public Routes */
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                /* Doctor Routes */
                <Route element={<RequireAuth allowedRoles={["Doctor"]} />}>
                    <Route path="/prescription/add" element={<RegisterPrescription />} />{" "}
                    <Route path="/prescription/update" element={<UpdatePrescription />} />
                    <Route path="/prescription/delete" element={<DeletePrescription />} />
                </Route>
                /* Admin Routes */
                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route path="/patient/update" element={<UpdatePatient />} />
                    <Route path="/patient/delete" element={<DeletePatient />} />
                    <Route path="/doctor/view" element={<ViewDoctor />} />
                    <Route path="/doctor/add" element={<RegisterDoctor />} />
                    <Route path="/doctor/update" element={<UpdateDoctor />} />
                    <Route path="/doctor/delete" element={<DeleteDoctor />} />
                    <Route path="/appointment/update" element={<UpdateAppointment />} />
                    <Route path="/appointment/delete" element={<DeleteAppointment />} />
                </Route>
                /*Patient and Admin Routes */
                <Route element={<RequireAuth allowedRoles={["Patient", "Admin"]} />}>
                    <Route path="/appointment/add" element={<RegisterAppointment />} />
                    <Route path="/patient/add" element={<RegisterPatient />} />
                </Route>
                /*Doctor and Admin Routes */
                <Route element={<RequireAuth allowedRoles={["Doctor", "Admin"]} />}>
                    <Route path="/patient/view" element={<ViewPatient />} />
                </Route>
                /*Patient, Doctor and Admin Routes */
                <Route element={<RequireAuth allowedRoles={["Patient", "Doctor", "Admin"]} />}>
                    <Route path="/prescription/view" element={<ViewPrescription />} />
                    <Route path="/appointment/view" element={<ViewAppointment />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />}></Route>
        </Routes>
    );
}

export default App;
