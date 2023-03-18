import { useDeletePrescriptionMutation } from "./prescriptionApiSlice";

import { useLocation, useNavigate } from "react-router-dom";

const DeletePrescription = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [deletePrescription, { isLoading }] = useDeletePrescriptionMutation();

    const { Disease, Doctor, Patient, Allergy, Medicine, PrescriptionID } = location.state.body;

    if (isLoading) return <h1>LOADING...</h1>;

    const handleDeletePrescription = async (e) => {
        e.preventDefault();
        try {
            await deletePrescription({
              PrescriptionID,
            }).unwrap();
            alert(`prescription deleted`);
            Navigate("/prescription/view");
        } catch (error) {
            if (error?.status) {
                console.log(error);
                alert("No response from server");
            } else if (error.status === 409) alert(error.body.Title);
        }
    };

    const DeletePrescription = (
        <form className="formAdd" onSubmit={handleDeletePrescription}>
            <h2>Delete Prescription</h2>
            <label htmlFor="patientList">Selected Patient</label>
            <input id="patientList" type="text" value={Doctor.DName} readOnly />

            <label htmlFor="doctorList">Selected Doctor</label>
            <input id="doctorList" type="text" value={Patient.Name} readOnly />

            <label htmlFor="Disease">Disease</label>
            <input id="Disease" type="text" value={Disease} readOnly />
            <label htmlFor="Allergy">Allergy</label>
            <input id="Allergy" type="text" value={Allergy} readOnly />
            <label htmlFor="Medicine">Medicine</label>
            <input id="Medicine" type="text" value={Medicine} readOnly />

            <input type="submit" readOnly value="Delete Appointment" />
        </form>
    );
    return DeletePrescription;
};

export default DeletePrescription;
