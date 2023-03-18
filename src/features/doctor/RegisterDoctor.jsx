import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateDoctorMutation } from "./doctorApiSlice";

const RegisterDoctor = () => {
    const Navigate = useNavigate();

    const [createDoctor, { isLoading }] = useCreateDoctorMutation();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [dName, setDName] = useState("");
    const [contact, setContact] = useState("");
    const [department, setDepartment] = useState("");
    const [fees, setFees] = useState("");

    const handleUsernameInput = (e) => setUsername(e.target.value);
    const handlePasswordInput = (e) => setPassword(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);
    const handleNameInput = (e) => setDName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleDepartmentInput = (e) => setDepartment(e.target.value);
    const handleFeeInput = (e) => setFees(e.target.value);

    const handleAddDoctor = async (e) => {
        e.preventDefault();
        try {
            await createDoctor({
                Username: username,
                Password: password,
                Email: email,
                DName: dName,
                Contact: contact,
                Department: department,
                Fees: fees,
            }).unwrap();
            alert("Doctor added");
            Navigate("/doctor/view");
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };
    const AddDoctor = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formAdd" onSubmit={handleAddDoctor}>
            <h2>Add Doctor</h2>
            <label htmlFor="Username">Username</label>
            <input
                placeholder="Username"
                id="Username"
                type="text"
                value={username}
                onChange={handleUsernameInput}
                required
            />
            <label htmlFor="Password">Password</label>
            <input
                placeholder="Password"
                id="Password"
                type="password"
                value={password}
                onChange={handlePasswordInput}
                required
            />
            <label htmlFor="Email">Email</label>
            <input
                placeholder="Email"
                id="Email"
                type="text"
                value={email}
                onChange={handleEmailInput}
                required
            />
            <label htmlFor="dName">DName</label>
            <input
                placeholder="DName"
                id="dName"
                type="text"
                value={dName}
                onChange={handleNameInput}
                required
            />

            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact Number"
                id="Contact"
                type="number"
                value={contact}
                onChange={handleContactInput}
                required
            />
            <label htmlFor="department">Department</label>
            <input
                placeholder="Department"
                id="department"
                type="text"
                value={department}
                onChange={handleDepartmentInput}
                required
            />
            <label htmlFor="fees">Fees</label>

            <input
                placeholder="Fees"
                id="fees"
                type="number"
                value={fees}
                onChange={handleFeeInput}
                required
            />

            <input type="submit" readOnly value="Add Doctor" />
        </form>
    );
    return AddDoctor;
};

export default RegisterDoctor;
