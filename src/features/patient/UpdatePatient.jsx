import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUpdatePatientMutation } from "./patientApiSlice";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";
import SelectDropdown from "../../components/SelectDropdown";

const UpdatePatient = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [updatePatient, { isLoading }] = useUpdatePatientMutation();
    const { data: Doctors, isLoading: doctorLoading } = useGetDoctorsQuery();
    const { PatientID, Name, Gender, Contact, Address, Bill = 0 } = location.state.body;

    const [updatedName, setUpdatedName] = useState(Name);
    const [updatedselectedGender, setUpdatedSelectedGender] = useState(Gender);
    const [updatedContact, setUpdatedContact] = useState(Contact);
    const [updatedAddress, setUpdatedAddress] = useState(Address);
    const [updatedBill, setUpdatedBill] = useState(Bill);
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);
    if (isLoading || doctorLoading) return <h1>LOADING...</h1>;
    const DoctorArray = Doctors.doctor;

    const handleNameInput = (e) => setUpdatedName(e.target.value);
    const handleContactInput = (e) => setUpdatedContact(e.target.value);
    const handleAddressInput = (e) => setUpdatedAddress(e.target.value);
    const handleBillInput = (e) => setUpdatedBill(e.target.value);

    const handleUpdatePatient = async (e) => {
        e.preventDefault();
        try {
            await updatePatient({
                PatientID,
                Name: updatedName,
                Contact: updatedContact,
                Gender: updatedselectedGender,
                Address: updatedAddress,
                Bill: updatedBill,
                DoctorID: selectedDoctorID,
            }).unwrap();
            alert("Patient Updated");
            Navigate("/patient/view");
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const UpdatePatient = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formUpdate" onSubmit={handleUpdatePatient}>
            <label htmlFor="Name">Name</label>
            <input
                placeholder="Name"
                id="Name"
                type="text"
                value={updatedName}
                onChange={handleNameInput}
                required
            />
            <label htmlFor="Gender">Gender</label>

            <select
                value={updatedselectedGender}
                name="Gender"
                onChange={(e) => setUpdatedSelectedGender(e.target.value)}
            >
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact Number"
                id="Contact"
                type="number"
                value={updatedContact}
                onChange={handleContactInput}
                required
            />
            <label htmlFor="Address">Address</label>
            <input
                placeholder="Address"
                id="Address"
                type="text"
                value={updatedAddress}
                onChange={handleAddressInput}
                required
            />
            <label htmlFor="Bill">Bill</label>
            <input
                placeholder="Bill"
                id="Bill"
                type="text"
                value={updatedBill}
                onChange={handleBillInput}
                required
            />
            {/* Add select doctor */}
            <label htmlFor="doctorName">Doctor Name</label>
            <SelectDropdown
                name="doctorName"
                array={DoctorArray}
                optionHeading="Select a doctor"
                keyName="DoctorID"
                optionValue="DName"
                setState={setSelectedDoctorID}
            />

            <input type="submit" readOnly value="Update Patient" />
        </form>
    );

    return UpdatePatient;
};

export default UpdatePatient;
