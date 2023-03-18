import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRegisterPatientMutation } from "./patientApiSlice";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";
import SelectDropdown from "../../components/SelectDropdown";
import { useNavigate } from "react-router-dom";

const RegisterPatient = () => {
    /* Make this private to admin and render this register element also which will  */
    const [registerPatient, { isLoading }] = useRegisterPatientMutation();
    const { data: Doctors, isLoading: doctorLoading } = useGetDoctorsQuery();
    const Navigate = useNavigate();

    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("Male");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");
    const [Bill, setBill] = useState("");
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);

    const { isAdmin } = useAuth();
    let DoctorArray;

    const USER_REGEX = /^[A-z]{3,20}$/;
    const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;
    const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
    const handleConfirmPwdInput = (e) => setConfirmPassword(e.target.value);
    const handleEmailInput = (e) => setEmail(e.target.value);
    const handleNameInput = (e) => setName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleAddressInput = (e) => setAddress(e.target.value);
    const handleBillInput = (e) => setBill(e.target.value);

    if (isLoading || doctorLoading) return <h1>LOADING...</h1>;

    if (isAdmin) DoctorArray = Doctors.doctor;

    const handleAddPatient = async (e) => {
        e.preventDefault();
        if (isAdmin) {
            if (!USER_REGEX.test(Username)) return alert("Please change username");
            if (!PWD_REGEX.test(confirmPassword)) return alert("Please change password");
            if (!EMAIL_REGEX.test(Email)) return alert("Please enter a valid E-Mail");
            if (Password !== confirmPassword)
                return alert("Password and Comfirm password didn't matched");
        }

        try {
            await registerPatient({
                Name,
                Contact,
                Gender: selectedGender,
                Address,
                DoctorID: selectedDoctorID,
                Username,
                Password: confirmPassword,
                Email,
            }).unwrap();
            alert("New Patient Added");

            setName("");
            setSelectedGender("Male");
            setContact("");
            setAddress("");
            setBill("");
            if(!isAdmin)Navigate('/prescription/view')
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const AddPatient = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formAdd" onSubmit={handleAddPatient}>
            <h2>Add Patient</h2>
            {isAdmin && <label>Username</label>}
            {isAdmin && (
                <input
                    placeholder="Username(3-20 characters)"
                    type="text"
                    value={Username}
                    onChange={handleUserInput}
                    autoComplete="off"
                    required
                />
            )}
            {isAdmin && <label>Password</label>}

            {isAdmin && (
                <input
                    placeholder="Password(4-12 chars inc. !@#$%)"
                    type="password"
                    value={Password}
                    onChange={handlePwdInput}
                    autoComplete="off"
                    required
                />
            )}
            {isAdmin && <label>Confirm Password</label>}

            {isAdmin && (
                <input
                    placeholder="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPwdInput}
                    autoComplete="off"
                    required
                />
            )}
            {isAdmin && <label>Email</label>}

            {isAdmin && (
                <input
                    placeholder="Email"
                    type="text"
                    value={Email}
                    onChange={handleEmailInput}
                    required
                />
            )}
            <label htmlFor="Name">Name</label>
            <input
                placeholder="Name"
                id="Name"
                type="text"
                value={Name}
                onChange={handleNameInput}
                required
            />
            <label htmlFor="Gender">Gender</label>

            <select
                value={selectedGender}
                name="Gender"
                onChange={(e) => setSelectedGender(e.target.value)}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact Number"
                id="Contact"
                type="number"
                value={Contact}
                onChange={handleContactInput}
                required
            />
            <label htmlFor="Address">Address</label>
            <input
                placeholder="Address"
                id="Address"
                type="text"
                value={Address}
                onChange={handleAddressInput}
                required
            />
            {isAdmin && <label htmlFor="Bill">Bill</label>}
            {isAdmin && (
                <input
                    placeholder="Bill"
                    id="Bill"
                    type="text"
                    value={Bill}
                    onChange={handleBillInput}
                    required
                />
            )}
            {isAdmin && <label htmlFor="doctorName">Doctor Name</label>}
            {isAdmin && (
                <SelectDropdown
                    name="doctorName"
                    array={DoctorArray}
                    optionHeading="Select a doctor"
                    keyName="DoctorID"
                    optionValue="DName"
                    setState={setSelectedDoctorID}
                    defaultVal={null}
                />
            )}
            <input type="submit" readOnly value="Add Patient" />
        </form>
    );

    return AddPatient;
};

export default RegisterPatient;
