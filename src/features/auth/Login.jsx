import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Login = () => {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const Auth = useAuth();
    useEffect(() => {
        if (Auth.isPatient) navigate("/patient/add");
        else if (Auth.isDoctor) navigate("/patient/view");
        else if (Auth.isAdmin) navigate("/doctor/view");
    }, [useAuth]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await login({
                Username: user,
                Password: pwd,
            }).unwrap();
            dispatch(setCredentials({ ...userData, user }));
            setUser("");
            setPwd("");
            navigate("/patient/add");
        } catch (error) {
            console.log(error);
            if (!error?.status) {
                // isLoading: true until timeout occurs
                return alert("No Server Response");
            } else if (error.status === 404 || error.status === 401) {
                return alert(error.data.Title);
            } else {
                return alert("Login Failed");
            }
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);
    const handlePwdInput = (e) => setPwd(e.target.value);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="parentContainer">
            <section className="container">
                <form onSubmit={handleSubmit} className="form">
                <h2>Login </h2>
                    <input
                        placeholder="Username"
                        type="text"
                        value={user}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        value={pwd}
                        onChange={handlePwdInput}
                        autoComplete="off"
                        required
                    />

                    <div className="buttonsContainer">
                        <input type="submit" readOnly value="Sign In" />
                        <input
                            type="Button"
                            readOnly
                            value="Register"
                            onClick={() => navigate("/register")}
                        />
                    </div>
                </form>
            </section>
        </div>
    );

    return content;
};

export default Login;
