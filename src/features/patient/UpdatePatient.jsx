import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useUpdatePatientMutation } from "./patientApiSlice";
import { useLocation } from "react-router-dom";

const UpdatePatient = () => {
    const [updatePatient, { isLoading }] = useUpdatePatientMutation();
    const location = useLocation();
    console.log(location.state.body);
    const { PatientID, Name, Gender, Contact, Address, Bill=0 } = location.state.body;

    const [updatedName, setUpdatedName] = useState(Name);
    const [updatedselectedGender, setUpdatedSelectedGender] = useState(Gender);
    const [updatedContact, setUpdatedContact] = useState(Contact);
    const [updatedAddress, setUpdatedAddress] = useState(Address);
    const [updatedBill, setUpdatedBill] = useState(Bill);

    const { isAdmin } = useAuth();

    const handleNameInput = (e) => setUpdatedName(e.target.value);
    const handleContactInput = (e) => setUpdatedContact(e.target.value);
    const handleAddressInput = (e) => setUpdatedAddress(e.target.value);
    const handleBillInput = (e) => setUpdatedBill(e.target.value);

    const handleUpdatePatient = async (e) => {
        e.preventDefault();
        try {
            await updatePatient({
              PatientID,
                Name:updatedName,
                Contact:updatedContact,
                Gender: updatedselectedGender,
                Address:updatedAddress,
                Bill:updatedBill
            }).unwrap();
            alert("Patient Updated");

            setUpdatedName("");
            setUpdatedSelectedGender("");
            setUpdatedContact("");
            setUpdatedAddress("");
            setUpdatedBill("");
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const AddPatient = isLoading ? (
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
            {isAdmin && <label htmlFor="Bill">Bill</label>}
            {isAdmin && (
                <input
                    placeholder="Bill"
                    id="Bill"
                    type="text"
                    value={updatedBill}
                    onChange={handleBillInput}
                    required
                />
            )}
            <input type="submit" readOnly value="Update Patient" />
        </form>
    );

    return AddPatient;
};

export default UpdatePatient;
