import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/* Add navbar here */
const Layout = () => {return(
    <>
        <Navbar />
        <Outlet/>
    </>)
};

export default Layout;
