import { useState } from "react";
import { useUpdateDoctorMutation } from "./doctorApiSlice";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateDoctor = () => {
    const [updateDoctor, { isLoading }] = useUpdateDoctorMutation();
    const location = useLocation();
    const Navigate = useNavigate();
    const { DoctorID, DName, Contact, Department, Fees } = location.state.body;

    const [updatedName, setUpdatedName] = useState(DName);
    const [updatedContact, setUpdatedContact] = useState(Contact);
    const [updatedDepartment, setUpdatedDepartment] = useState(Department);
    const [updatedFees, setUpdatedFees] = useState(Fees);

    const handleUpdateName = (e) => setUpdatedName(e.target.value);
    const handleUpdatedContact = (e) => setUpdatedContact(e.target.value);
    const handleUpdatedDepartment = (e) => setUpdatedDepartment(e.target.value);
    const handleUpdatedFees = (e) => setUpdatedFees(e.target.value);

    const handleUpdateDoctor = async (e) => {
        e.preventDefault();
        try {
            await updateDoctor({
                DoctorID,
                DName: updatedName,
                Contact: updatedContact,
                Department: updatedDepartment,
                Fees: updatedFees,
            }).unwrap();
            alert("Doctor Updated");
            Navigate("/doctor/view");
        } catch (e) {
            if (e?.status) alert("No response from server");
            else if (e.status === 409) alert(error.body.Title);
        }
    };

    const UpdateDoctor = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formUpdate" onSubmit={handleUpdateDoctor}>
            <label htmlFor="DName">DName</label>
            <input
                placeholder="DName"
                id="DName"
                type="text"
                value={updatedName}
                onChange={handleUpdateName}
                required
            />
            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact"
                id="Contact"
                type="text"
                value={updatedContact}
                onChange={handleUpdatedContact}
                required
            />
            <label htmlFor="Department">Department</label>
            <input
                placeholder="Department"
                id="Department"
                type="text"
                value={updatedDepartment}
                onChange={handleUpdatedDepartment}
                required
            />
            <label htmlFor="Fees">Fees</label>
            <input
                placeholder="Fees"
                id="Fees"
                type="text"
                value={updatedFees}
                onChange={handleUpdatedFees}
                required
            />

            <input type="submit" readOnly value="Update Doctor" />
        </form>
    );

    return UpdateDoctor;
};

export default UpdateDoctor;
