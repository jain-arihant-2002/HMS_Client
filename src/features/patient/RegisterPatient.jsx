import { useState } from "react";
import { useRegisterPatientMutation } from "./patientApiSlice";
const RegisterPatient = () => {
    const [registerPatient, { isLoading }] = useRegisterPatientMutation();

    const [Name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("male");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");

    const handleNameInput = (e) => setName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleAddressInput = (e) => setAddress(e.target.value);

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            await registerPatient({
                Name,
                Contact,
                Gender: selectedGender,
                Address,
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const AddPatient = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <>
            <form action=""></form>
            <input
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
            />
        </>
    );

    return AddPatient;
};

export default RegisterPatient;
