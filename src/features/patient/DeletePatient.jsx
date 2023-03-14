import { useDeletePatientMutation } from "./patientApiSlice";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const DeletePatient = () => {
    const [deletePatient, { isLoading }] = useDeletePatientMutation();
    const location = useLocation();
    const navigate = useNavigate();

    const { PatientID, Name, Gender, Contact, Address, Bill = 0 } = location.state.body;

    const handleDeletePatient = async (e) => {
        e.preventDefault();
        try {
            await deletePatient({ PatientID, Name, Contact, Gender, Address, Bill }).unwrap();
            alert("Patient Deleted");
            navigate("/patient/view");
        } catch (error) {
            console.log(error);
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const DeletePatient = isLoading ? (
        <h1>Loading...</h1>
    ) : (
        <form className="formUpdate" onSubmit={handleDeletePatient}>
            <label htmlFor="PatientID">PatientID</label>
            <input
                placeholder="PatientID"
                id="PatientID"
                type="text"
                value={PatientID}
                readOnly
                required
            />
            <label htmlFor="Name">Name</label>
            <input placeholder="Name" id="Name" type="text" value={Name} readOnly required />
            <label htmlFor="Gender">Gender</label>
            <select value={Gender} name="Gender" readOnly>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <label htmlFor="Contact">Contact</label>
            <input
                placeholder="Contact Number"
                id="Contact"
                type="number"
                value={Contact}
                readOnly
                required
            />
            <label htmlFor="Address">Address</label>
            <input
                placeholder="Address"
                id="Address"
                type="text"
                value={Address}
                readOnly
                required
            />
            <label htmlFor="Bill">Bill</label>
            <input placeholder="Bill" id="Bill" type="text" value={Bill} readOnly />
            <input type="submit" readOnly value="Delete Patient" />
        </form>
    );

    return DeletePatient;
};

export default DeletePatient;
