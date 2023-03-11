import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");

    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            navigate("/Welcome");
        } catch (err) {
            console.log(err);
            if (!err?.originalStatus) {
                // isLoading: true until timeout occurs
                setErrMsg("No Server Response");
            } else if (err.originalStatus === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg("Login Failed");
            }
            alert(errMsg);
        }
    };

    const handleUserInput = (e) => setUser(e.target.value);

    const handlePwdInput = (e) => setPwd(e.target.value);

    const content = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="loginParent">
            <section className="login">
                <h1 id="loginH1">Login To HMS</h1>
                <form onSubmit={handleSubmit} className="loginForm">
                    <input
                        placeholder="Username"
                        type="text"
                        id="username"
                        value={user}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />

                    <input
                        placeholder="Password"
                        type="password"
                        id="password"
                        value={pwd}
                        onChange={handlePwdInput}
                        autoComplete="off"
                        required
                    />

                    <div className="buttonsContainer">
                        <input type="Button"value="Register" />
                        <input type="submit" value="Sign In" />
                    </div>
                </form>
            </section>
        </div>
    );

    return content;
};

export default Login;
