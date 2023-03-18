

import { useDeleteDoctorMutation } from "./doctorApiSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeleteDoctor = () => {
    const [deleteDoctor, { isLoading }] = useDeleteDoctorMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const { DoctorID, DName, Contact, Department, Fees } = location.state.body;
console.log(location.state.body)
    const handleDeleteDoctor = async (e) => {
        e.preventDefault();
        try {
            await deleteDoctor({ DoctorID}).unwrap();
            alert("Doctor Deleted");
            navigate("/doctor/view");
        } catch (error) {
            console.log(error);
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const DeleteDoctor = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formUpdate" onSubmit={handleDeleteDoctor}>
            <h2>Delete Doctor</h2>
            <label htmlFor="DoctorID">DoctorID</label>
            <input
                placeholder="DoctorID"
                id="DoctorID"
                type="text"
                value={DoctorID}
                readOnly
                required
            />
            <label htmlFor="DName">DName</label>
            <input placeholder="DName" id="DName" type="text" value={DName} readOnly required />
            
            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact Number"
                id="Contact"
                type="number"
                value={Contact}
                readOnly
                required
            />
            <label htmlFor="Department">Department</label>
            <input
                placeholder="Department"
                id="Department"
                type="text"
                value={Department}
                readOnly
                required
            />
            <label htmlFor="Fees">Fees</label>
            <input placeholder="Fees" id="Fees" type="text" value={Fees} readOnly />
            <input type="submit" readOnly value="Delete Patient" />
        </form>
    );

    return DeleteDoctor;
};

export default DeleteDoctor;
