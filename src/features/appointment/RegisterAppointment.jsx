import useAuth from "../../hooks/useAuth";
import { useCreateAppointmentMutation } from "./appointmentApiSlice";
const RegisterAppointment = () => {
    const [createAppointment, { isLoading }] = useCreateAppointmentMutation();

    const { isPatient, isAdmin } = useAuth();

    const handleAddAppointment = async () => {
        await createAppointment({ Date, Time, DoctorID, PatientID });
    };
    return <div>RegisterAppointment</div>;
};

export default RegisterAppointment;
