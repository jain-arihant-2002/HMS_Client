import { useState, useEffect } from "react";
import { useCreateAppointmentMutation } from "./appointmentApiSlice";
import { useGetDoctorsQuery } from "../doctor/doctorApiSlice";
import { useGetPatientsQuery } from "../patient/patientApiSlice";
import useAuth from "../../hooks/useAuth";
import SelectDropdown from "../../components/SelectDropdown";
import { selectCurrentUser } from "../auth/authSlice";
import { useSelector } from "react-redux";


const RegisterAppointment = () => {
    const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
    const { data: doctorList, isLoading: doctorListLoading } = useGetDoctorsQuery();
    const { data: patientList, isLoading: patientListLoading } = useGetPatientsQuery();
    const patientName = useSelector(selectCurrentUser);

    const { isAdmin, isPatient } = useAuth();

    const [selectedDoctorID, setSelectedDoctorID] = useState(null);
    const [selectedPatientID, setSelectedPatientID] = useState(null);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const handleDateInput = (e) => setDate(e.target.value);
    const handleTimeInput = (e) => setTime(e.target.value);

    if (isLoading || doctorListLoading || patientListLoading) return <h1>LOADING...</h1>;

    const DoctorArray = doctorList.doctor;
    const PatientArray = patientList.patient;

    const DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const TIME_REGEX = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

    useEffect(() => {
        try{
             if (isPatient) setSelectedPatientID(PatientArray[0].PatientID);
        }
        catch(e){}
    }
}, [PatientArray]);

    
    const handleAddAppointment = async (e) => {
        e.preventDefault();
        try {
           // if (isPatient) setSelectedPatientID(PatientArray[0].PatientID);
            if (selectedDoctorID === null || selectedPatientID === null)
                return alert("Please select patient and doctor");
            if (!DATE_REGEX.test(date)) return alert(`Problem with entered Date`);

            if (!TIME_REGEX.test(time)) return alert(`Problem with entered Time`);
            if (isPatient) setSelectedPatientID(PatientArray[0].PatientID);

            await createAppointment({
                Date: date,
                Time: time,
                DoctorID: selectedDoctorID,
                PatientID: selectedPatientID,
            }).unwrap();

            setSelectedDoctorID(null);
            setSelectedPatientID(null);
            setDate("");
            setTime("");
            
            alert(`appointment added`);
        } catch (error) {
            if (error?.status) alert("No response from server");
            else if (error.status === 409) alert(error.body.Title);
        }
    };

    const AddAppointment = (
        <form className="formAdd" onSubmit={handleAddAppointment}>
            <h2>Add Appointment</h2>
            {isAdmin && <label htmlFor="patientList">Select Patient</label>}
            {isAdmin && (
                <SelectDropdown
                    name="patientList"
                    array={PatientArray}
                    optionHeading="Select a Patient"
                    keyName="PatientID"
                    optionValue="Name"
                    setState={setSelectedPatientID}
                    defaultVal={null}
                />
            )}
            {isPatient && <label htmlFor="patient">Selected Patient</label>}
            {isPatient && (
                <input
                    placeholder="Patient Name"
                    id="patient"
                    type="text"
                    value={patientName}
                    readOnly
                />
            )}
            <label htmlFor="doctorList">Select Doctor</label>
            <SelectDropdown
                name="doctorList"
                array={DoctorArray}
                optionHeading="Select a doctor"
                keyName="DoctorID"
                optionValue="DName"
                setState={setSelectedDoctorID}
                defaultVal={null}
            />

            <label htmlFor="Date">Date</label>
            <input
                placeholder="Date (DD/MM/YYYY)"
                id="Date"
                type="text"
                value={date}
                onChange={handleDateInput}
                required
            />
            <label htmlFor="Time">Time</label>
            <input
                placeholder="Time (HH:MM )"
                id="Time"
                type="text"
                value={time}
                onChange={handleTimeInput}
                required
            />
            <input type="submit" readOnly value="Add Appointment" />
        </form>
    );

    return AddAppointment;
};

export default RegisterAppointment;
