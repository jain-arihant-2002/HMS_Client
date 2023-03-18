import { useState } from "react";
import { useCreatePrescriptionMutation } from "./prescriptionApiSlice";
import { useGetPatientsQuery } from "../patient/patientApiSlice";
import SelectDropdown from "../../components/SelectDropdown";
import { useNavigate } from "react-router-dom";

const RegisterPrescription = () => {
    const [createPrescription, { isLoading }] = useCreatePrescriptionMutation();
    const { data: patientList, isLoading: patientListLoading } = useGetPatientsQuery();
    const Navigate = useNavigate();

    const [selectedPatientID, setSelectedPatientID] = useState(null);
    const [disease, setDisease] = useState("");
    const [allergy, setAllergy] = useState("");
    const [medicine, setMedicine] = useState("");

    if (isLoading || patientListLoading) return <form className="formAdd">Loading...</form>;
    const PatientArray = patientList.patient;

    const handleDiseaseInput = (e) => setDisease(e.target.value);
    const handleAllergyInput = (e) => setAllergy(e.target.value);
    const handleMedicineInput = (e) => setMedicine(e.target.value);

    const handleAddPrescription = async (e) => {
        e.preventDefault();
        if (selectedPatientID === null) return alert("Please select a patient");
        try {
            await createPrescription({
                Disease: disease,
                Allergy: allergy,
                Medicine: medicine,
                PatientID: selectedPatientID,
            });
            alert("Prescription Created");
            Navigate("/prescription/view");
        } catch (error) {}
    };
    const AddPrescription = (
        <form className="formAdd" onSubmit={handleAddPrescription}>
            <h2>Add Prescription</h2>
            <label htmlFor="patientList">Select Patient</label>

            <SelectDropdown
                name="patientList"
                array={PatientArray}
                optionHeading="Select a Patient"
                keyName="PatientID"
                optionValue="Name"
                setState={setSelectedPatientID}
                defaultVal={null}
            />

            <label htmlFor="Disease">Disease</label>
            <input
                placeholder="Disease"
                id="Disease"
                type="text"
                value={disease}
                onChange={handleDiseaseInput}
                required
            />
            <label htmlFor="Allergy">Allergy</label>
            <input
                placeholder="Allergy"
                id="Allergy"
                type="text"
                value={allergy}
                onChange={handleAllergyInput}
                required
            />
            <label htmlFor="Medicine">Medicine</label>
            <input
                placeholder="Medicine"
                id="Medicine"
                type="text"
                value={medicine}
                onChange={handleMedicineInput}
                required
            />
            <input type="submit" readOnly value="Add Prescription" />
        </form>
    );
    return AddPrescription;
};

export default RegisterPrescription;
