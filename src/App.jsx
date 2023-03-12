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
            </Route>
        </Routes>
    );
}

export default App;
