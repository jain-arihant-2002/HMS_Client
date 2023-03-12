import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./features/auth/Login";
import Register from "./features/register/Register";
import RequireAuth from "./features/auth/RequireAuth";
import RegisterPatient from "./features/patient/RegisterPatient";

import "./App.css";

function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                /* Public Routes */
                
                <Route index path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                /* Protected Routes For Patient */
                <Route element={<RequireAuth allowedRoles={["Patient"]} />}>
                    <Route path="/patient/add" element={<RegisterPatient />} />
                    {/*Add here: View doctor List */}
                </Route>
            </Route>
        </Routes>
    );
}

export default App;
