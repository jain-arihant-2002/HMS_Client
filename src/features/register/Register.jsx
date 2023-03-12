import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRegisterUserMutation } from "./registerApiSlice";
/* import { useRegisterPatientMutation } from "../patient/patientApiSlice"; */

const Register = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    /* const [registerPatient, { isLoading: isLoadingPatient }] =
        useRegisterPatientMutation(); */

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
    /* const handleNameInput = (e) => setName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleAddressInput = (e) => setAddress(e.target.value); */

    /* const [Name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("male");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState(""); */

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
            /* await registerPatient({
                Name,
                Contact,
                Gender: selectedGender,
                Address
            }).unwrap(); */
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
            <section className="container">
                <h1>Register</h1>
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
                    {/* <input
                            placeholder="Name"
                            type="text"
                            value={Name}
                            onChange={handleNameInput}
                            required
                        />
                        
                        <select
                        value={selectedGender}
                            name="Gender"
                            onChange={(e) => setSelectedGender(e.target.value)}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                        <input
                            placeholder="Contact Number"
                            type="number"
                            value={Contact}
                            onChange={handleContactInput}
                            required
                        />
                        <input
                            placeholder="Address"
                            type="text"
                            value={Address}
                            onChange={handleAddressInput}
                            required
                        /> */}

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
