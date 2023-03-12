import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from "./registerApiSlice";

const Register = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();

    const USER_REGEX = /^[A-z]{3,20}$/;
    const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const navigate = useNavigate();

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [Email, setEmail] = useState("");

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!USER_REGEX.test(Username)) return alert("Please change username");
        if (!PWD_REGEX.test(confirmPassword)) return alert("Please change password");
        if (!EMAIL_REGEX.test(Email)) return alert("Please enter a valid E-Mail");
        if (Password !== confirmPassword)
            return alert("Password and Comfirm password didn't matched");

        try {
            await registerUser({
                Username,
                Password,
                Email,
            }).unwrap(); /* Save response's login id  */

            navigate("/"); /* change this to welcome page */
        } catch (error) {
            if (!error?.status) {
                // isLoading: true until timeout occurs
                alert("No Server Response");
            } else if (error.status === 409) {
                alert(error.data.Title);
            } else {
                alert("Login Failed");
            }
        }
    };

    const RegisterForm = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <div className="parentContainer">
            <h1 className="logo">Hospital Mangement System</h1>
            <section className="container">
                <h2>Register</h2>
                <form onSubmit={handleRegister} className="form">
                    <input
                        placeholder="Username(3-20 characters)"
                        type="text"
                        value={Username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                    <input
                        placeholder="Password(4-12 chars inc. !@#$%)"
                        type="password"
                        value={Password}
                        onChange={handlePwdInput}
                        autoComplete="off"
                        required
                    />
                    <input
                        placeholder="Confirm Password"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPwdInput}
                        autoComplete="off"
                        required
                    />
                    <input
                        placeholder="Email"
                        type="text"
                        value={Email}
                        onChange={handleEmailInput}
                        required
                    />

                    <div className="buttonsContainer">
                        <input
                            type="Button"
                            value="Sign In"
                            onClick={() => navigate("/")}
                            readOnly
                        />
                        <input type="submit" value="Register" disabled={false} readOnly />
                    </div>
                </form>
            </section>
        </div>
    );

    return RegisterForm;
};

export default Register;
