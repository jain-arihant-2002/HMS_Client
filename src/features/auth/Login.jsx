import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useLoginMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";

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
        <div className="parentContainer">
            <section className="container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="form">
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
                        <input type="Button" readOnly value="Register" onClick={()=>navigate('/register')} />
                    </div>
                </form>
            </section>
        </div>
    );

    return content;
};

export default Login;
