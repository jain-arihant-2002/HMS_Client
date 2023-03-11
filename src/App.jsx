import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import RequireAuth from "./features/auth/RequireAuth";
import Welcome from "./components/Welcome";
import './App.css'

function App() {
    return (
        /* Routes for patient 
            1)View Appointments
            2)View Prescription
            3)View Doctor list(maybe) 
            4)Add patient data(Get this while registring user on website)*/

        /* Routes for doctor
            1)View Appointments
            2)Create Appointment
            3)Update Appointment
            4)Delete Appointment
            5)View Prescription
            6)Create Prescription
            7)Update Prescription 
            8)Delete Prescription
            9)View Patient
        */
        /* Routes for Admin
            1)View Appointments
            2)Create Appointment
            3)Update Appointment
            4)Delete Appointment
            5)View Prescription
            6)Create Prescription
            7)Update Prescription 
            8)Delete Prescription
            9)View Patient
            10)Add patient 
            11)Delete Patient
            12)Update Patient
        */
        <Routes>
            <Route element={<Layout />}>
                /* Public Routes */
                <Route index path="/" element={<Login />} />
                /* Protected Routes For Patient */
                <Route element={<RequireAuth allowedRoles={["Patient"]} />}>
                    <Route path="/welcome" element={<Welcome />} />
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
