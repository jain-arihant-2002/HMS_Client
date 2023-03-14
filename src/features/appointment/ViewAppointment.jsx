import useAuth from "../../hooks/useAuth";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";

const ViewAppointment = () => {
    const { data: Appointments, isLoading } = useGetAppointmentsQuery();
    const { isAdmin } = useAuth();
    const headerArray = ["AppointmentID", "DoctorID", "PatientID", "Date", "Time"];

    if (isLoading)
        return (
            <div className="tableContainer">
                <h1>Loading...</h1>
            </div>
        );

    const appointmentList = Appointments.appointment;

    if (appointmentList.length <= 0 || !appointmentList)
        return (
            <div className="tableContainer">
                <h1> No data to show </h1>
            </div>
        );
    const ViewAppointments = () => (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} renderBoolean={isAdmin} />}
                {
                    <TableRow
                        tableBody={appointmentList}
                        tableBodyKeys={headerArray}
                        element="patient"
                        renderBoolean={isAdmin}
                    />
                }
            </table>
        </div>
    );

    return ViewAppointments;
};

export default ViewAppointment;
