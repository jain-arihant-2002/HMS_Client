import { useState } from "react";
import { useUpdatePatientMutation } from "./patientApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";

const UpdatePatient = () => {
    
    const [updatePatient, { isLoading }] = useUpdatePatientMutation();
    const { data: Doctors, isLoading: doctorLoading } = useGetDoctorsQuery();

    const location = useLocation();
    const Navigate = useNavigate();
    const { PatientID, Name, Gender, Contact, Address, Bill = 0 } = location.state.body;

    if (isLoading || doctorLoading) return <h1>LOADING...</h1>;

    const DoctorArray = Doctors.doctor;

    const [updatedName, setUpdatedName] = useState(Name);
    const [updatedselectedGender, setUpdatedSelectedGender] = useState(Gender);
    const [updatedContact, setUpdatedContact] = useState(Contact);
    const [updatedAddress, setUpdatedAddress] = useState(Address);
    const [updatedBill, setUpdatedBill] = useState(Bill);
    const [selectedDoctorID, setSelectedDoctorID] = useState(null);

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

            <select
                defaultValue={null}
                name="doctorName"
                onChange={(e) => {
                    setSelectedDoctorID(e.target.value);
                }}
            >
                <option value={null}>Select a doctor</option>
                {DoctorArray.map((doctor) => (
                    <option key={doctor.DoctorID} value={doctor.DoctorID}>
                        {doctor.DName}
                    </option>
                ))}
            </select>

            <input type="submit" readOnly value="Update Patient" />
        </form>
    );

    return UpdatePatient;
};

export default UpdatePatient;
