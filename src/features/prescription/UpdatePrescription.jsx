import { useState } from "react";
import { useUpdatePrescriptionMutation } from "./prescriptionApiSlice";
import { useGetPatientsQuery } from "../patient/patientApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";

const UpdatePrescription = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [updatePrescription, { isLoading }] = useUpdatePrescriptionMutation();
    const { data: patientList, isLoading: patientListLoading } = useGetPatientsQuery();

    const { Disease, Patient, Allergy, Medicine, PrescriptionID } = location.state.body;

    const PatID = Patient.PatientID;

    const [updatedSelectedPatientID, setUpdatedSelectedPatientID] = useState(PatID);
    const [updatedDisease, setUpdatedDisease] = useState(Disease);
    const [updatedAllergy, setUpdatedAllergy] = useState(Allergy);
    const [updatedMedicine, setUpdatedMedicine] = useState(Medicine);

    const handleDiseaseInput = (e) => setUpdatedDisease(e.target.value);
    const handleAllergyInput = (e) => setUpdatedAllergy(e.target.value);
    const handleMedicineInput = (e) => setUpdatedMedicine(e.target.value);

    if (isLoading || patientListLoading) return <h1>LOADING...</h1>;

    const PatientArray = patientList.patient;

    const handleDeletePrescription = async (e) => {
        e.preventDefault();
        try {
            if (updatedSelectedPatientID === null) return alert("Please select patient");

           await updatePrescription({
                PrescriptionID,
                Disease: updatedDisease,
                Allergy: updatedAllergy,
                Medicine: updatedMedicine,
                PatientID: updatedSelectedPatientID,
            }).unwrap();
            alert(`prescription updated`);
            Navigate("/prescription/view");
        } catch (error) {
            if (error?.status) {
                console.log(error);
                alert("No response from server");
            } else if (error.status === 409) alert(error.body.Title);
        }
    };

    const UpdatePrescription = (
        <form className="formAdd" onSubmit={handleDeletePrescription}>
            <label htmlFor="patientList">Select Patient</label>

            <SelectDropdown
                name="patientList"
                array={PatientArray}
                optionHeading="Select a Patient"
                keyName="PatientID"
                optionValue="Name"
                setState={setUpdatedSelectedPatientID}
                defaultVal={updatedSelectedPatientID}
            />

            <label htmlFor="Disease">Disease</label>
            <input
                placeholder="Disease"
                id="Disease"
                type="text"
                value={updatedDisease}
                onChange={handleDiseaseInput}
                required
            />
            <label htmlFor="Allergy">Allergy</label>
            <input
                placeholder="Allergy"
                id="Allergy"
                type="text"
                value={updatedAllergy}
                onChange={handleAllergyInput}
                required
            />
            <label htmlFor="Medicine">Medicine</label>
            <input
                placeholder="Medicine"
                id="Medicine"
                type="text"
                value={updatedMedicine}
                onChange={handleMedicineInput}
                required
            />
            <input type="submit" readOnly value="Update Prescription" />
        </form>
    );
    return UpdatePrescription;
};

export default UpdatePrescription;
