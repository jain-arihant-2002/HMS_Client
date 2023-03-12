import React from "react";
import useAuth from "../hooks/useAuth";

/*  Navbar logic if no token then only heading with name "hms" else a vertical navbar */



const Navbar = () => {
    const { role } = useAuth();
    return <div>Navbar</div>;
};

export default Navbar;
