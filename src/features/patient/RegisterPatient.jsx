import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useRegisterPatientMutation } from "./patientApiSlice";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";
import SelectDropdown from "../../components/SelectDropdown";

const RegisterPatient = () => {
    const [registerPatient, { isLoading }] = useRegisterPatientMutation();
    const { data: Doctors, isLoading: doctorLoading } = useGetDoctorsQuery();

    const [Name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("male");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");
    const [Bill, setBill] = useState("");
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);

    const { isAdmin } = useAuth();
    let DoctorArray;

    const handleNameInput = (e) => setName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleAddressInput = (e) => setAddress(e.target.value);
    const handleBillInput = (e) => setBill(e.target.value);

    if (isLoading || doctorLoading) return <h1>LOADING...</h1>;

    if (isAdmin) DoctorArray = Doctors.doctor;

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            await registerPatient({
                Name,
                Contact,
                Gender: selectedGender,
                Address,
                DoctorID: selectedDoctorID,
            }).unwrap();
            alert("New Patient Added");

            setName("");
            setSelectedGender("");
            setContact("");
            setAddress("");
            setBill("");
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const AddPatient = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formAdd" onSubmit={handleAddPatient}>
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
