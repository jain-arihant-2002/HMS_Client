import { useDeleteAppointmentMutation } from "./appointmentApiSlice";

import { useLocation, useNavigate } from "react-router-dom";

const DeleteAppointment = () => {
    const location = useLocation();
    const Navigate = useNavigate();

    const [deleteAppointment, { isLoading }] = useDeleteAppointmentMutation();

    const { Date, Time, Doctor, Patient, AppointmentID } = location.state.body;

    if (isLoading) return <h1>LOADING...</h1>;

    const handleDeleteAppointment = async (e) => {
        e.preventDefault();
        try {
            await deleteAppointment({
                AppointmentID,
            }).unwrap();
            alert(`appointment deleted`);
            Navigate("/appointment/view");
        } catch (error) {
            if (error?.status) {
                console.log(error);
                alert("No response from server");
            } else if (error.status === 409) alert(error.body.Title);
        }
    };

    const DeleteAppointment = (
        <form className="formAdd" onSubmit={handleDeleteAppointment}>
            <label htmlFor="patientList">Selected Patient</label>
            <input id="patientList" type="text" value={Doctor.DName} readOnly />

            <label htmlFor="doctorList">Selected Doctor</label>
            <input id="doctorList" type="text" value={Patient.Name} readOnly />

            <label htmlFor="Date">Date</label>
            <input placeholder="Date (DD/MM/YYYY)" id="Date" type="text" value={Date} readOnly />
            <label htmlFor="Time">Time</label>
            <input placeholder="Time (HH:MM )" id="Time" type="text" value={Time} readOnly />
            <input type="submit" readOnly value="Delete Appointment" />
        </form>
    );
    return DeleteAppointment;
};

export default DeleteAppointment;
