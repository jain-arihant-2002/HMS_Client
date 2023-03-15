import { useState } from "react";
import { useUpdateAppointmentMutation } from "./appointmentApiSlice";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";
import { useGetPatientsQuery } from "../patient/patientApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SelectDropdown from "../../components/SelectDropdown";

const UpdateAppointment = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [updateAppointment, { isLoading }] = useUpdateAppointmentMutation();
    const { data: doctorList, isLoading: doctorListLoading } = useGetDoctorsQuery();
    const { data: patientList, isLoading: patientListLoading } = useGetPatientsQuery();

    const { Date, Time, Doctor, Patient, AppointmentID } = location.state.body;
    const DoctID = Doctor.DoctorID;
    const PatID = Patient.PatientID;

    const [updatedSelectedDoctorID, setUpdatedSelectedDoctorID] = useState(DoctID);
    const [updatedSelectedPatientID, setUpdatedSelectedPatientID] = useState(PatID);
    const [updatedDate, setUpdatedDate] = useState(Date);
    const [updatedTime, setUpdatedSime] = useState(Time);

    const handleDateInput = (e) => setUpdatedDate(e.target.value);
    const handleTimeInput = (e) => setUpdatedSime(e.target.value);

    if (isLoading || doctorListLoading || patientListLoading) return <h1>LOADING...</h1>;

    const DoctorArray = doctorList.doctor;
    const PatientArray = patientList.patient;

    const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const TIME_REGEX = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

    const handleUpdateAppointment = async (e) => {
        e.preventDefault();
        try {
            if (updatedSelectedDoctorID === null || updatedSelectedPatientID === null)
                return alert("Please select patient and doctor");
            if (!DATE_REGEX.test(updatedDate)) return alert(`Problem with entered Date`);

            if (!TIME_REGEX.test(updatedTime)) return alert(`Problem with entered Time`);

            await updateAppointment({
                AppointmentID,
                Date: updatedDate,
                Time: updatedTime,
                DoctorID: updatedSelectedDoctorID,
                PatientID: updatedSelectedPatientID,
            }).unwrap();
            alert(`appointment updated`);
            Navigate("/appointment/view");
        } catch (error) {
            if (error?.status) {
                console.log(error);
                alert("No response from server");
            } else if (error.status === 409) alert(error.body.Title);
        }
    };

    const UpdateAppointment = (
        <form className="formAdd" onSubmit={handleUpdateAppointment}>
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

            <label htmlFor="doctorList">Select Doctor</label>
            <SelectDropdown
                name="doctorList"
                array={DoctorArray}
                optionHeading="Select a doctor"
                keyName="DoctorID"
                optionValue="DName"
                setState={setUpdatedSelectedDoctorID}
                defaultVal={updatedSelectedDoctorID}
            />

            <label htmlFor="Date">Date</label>
            <input
                placeholder="Date (DD/MM/YYYY)"
                id="Date"
                type="text"
                value={updatedDate}
                onChange={handleDateInput}
                required
            />
            <label htmlFor="Time">Time</label>
            <input
                placeholder="Time (HH:MM )"
                id="Time"
                type="text"
                value={updatedTime}
                onChange={handleTimeInput}
                required
            />
            <input type="submit" readOnly value="Update Appointment" />
        </form>
    );
    return UpdateAppointment;
};

export default UpdateAppointment;
