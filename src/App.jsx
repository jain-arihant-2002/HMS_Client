import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/register/Register";
import RequireAuth from "./features/auth/RequireAuth";
import "./App.css";
import RegisterPatient from "./features/patient/RegisterPatient";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                /* Public Routes */
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                /* Protected Routes For Patient */
                <Route element={<RequireAuth allowedRoles={["Patient"]} />}>
                    <Route path="/appointment/view" element={<ViewAppointment />} />
                    <Route path="/prescription/view" element={<ViewPrescription />} />
                    {/*Add here: View doctor List */}
                    <Route path="/patient/add" element={<RegisterPatient />} />
                </Route>

                /* Protected Routes For Doctor */
                <Route element={<RequireAuth allowedRoles={["Doctor"]} />}>
                    <Route path="/appointment/add" element={<RegisterDoctor />} />
                    <Route path="/appointment/update" element={<UpdateDoctor />} />
                    <Route path="/appointment/delete" element={<DeleteDoctor />} />
                    <Route path="/appointment/view" element={<ViewDoctor />} />
                    <Route path="/prescription/add" element={<RegisterPrescription />} />
                    <Route path="/prescription/update" element={<UpdatePrescription />} />
                    <Route path="/prescription/delete" element={<DeletePrescription />} />
                    <Route path="/prescription/view" element={<ViewPrescription />} />
                    <Route path="/patient/view" element={<ViewPatient />} />
                </Route>
                
                /* Protected Routes For Admin */
                <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
                    <Route path="/patient/add" element={<RegisterPatient />} />
                    <Route path="/patient/update" element={<UpdatePatient />} />
                    <Route path="/patient/delete" element={<DeletePatient />} />
                    <Route path="/patient/view" element={<ViewPatient />} />
                    <Route path="/doctor/add" element={<RegisterDoctor />} />
                    <Route path="/doctor/update" element={<UpdateDoctor />} />
                    <Route path="/doctor/delete" element={<DeleteDoctor />} />
                    <Route path="/doctor/view" element={<ViewDoctor />} />
                    <Route path="/prescription/add" element={<RegisterPrescription />} />
                    <Route path="/prescription/update" element={<UpdatePrescription />} />
                    <Route path="/prescription/delete" element={<DeletePrescription />} />
                    <Route path="/prescription/view" element={<ViewPrescription />} />
                    <Route path="/appointment/add" element={<RegisterAppointment />} />
                    <Route path="/appointment/update" element={<UpdateAppointment />} />
                    <Route path="/appointment/delete" element={<DeleteAppointment />} />
                    <Route path="/appointment/view" element={<ViewAppointment />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
