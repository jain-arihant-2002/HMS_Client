import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import Navbar from "./Navbar";

/* Add navbar here */
const Layout = () => {return(
    <><Heading/>
        <Navbar />
        <Outlet/>
    </>)
};

export default Layout;
