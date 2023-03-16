import useAuth from "../../hooks/useAuth";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";

const ViewAppointment = () => {
    const { data: Appointments, isLoading } = useGetAppointmentsQuery();
    const { isPatient, isDoctor, isAdmin } = useAuth();

    let headerArray;
    let bodyKeyArray;

    if (isAdmin) {
        headerArray = ["AppointmentID", "DName", "PName", "Date", "Time"];
        bodyKeyArray = ["AppointmentID", "Doctor", "Patient", "Date", "Time"];
    }
    if (isPatient) {
        headerArray = ["AppointmentID", "DName", "Date", "Time"];
        bodyKeyArray = ["AppointmentID", "Doctor", "Date", "Time"];
    }
    if (isDoctor) {
        headerArray = ["AppointmentID", "PName", "Date", "Time"];
        bodyKeyArray = ["AppointmentID", "Patient", "Date", "Time"];
    }
    if (isLoading)
        return (
            <div className="tableContainer">
                <h2>Loading...</h2>
            </div>
        );

    const appointmentList = Appointments.appointment;
    if (appointmentList.length <= 0 || !appointmentList)
        return (
            <div className="tableContainer">
                <h2> No data to show </h2>
            </div>
        );
    const ViewAppointments = (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} renderBoolean={isAdmin} />}
                {
                    <TableRow
                        tableBody={appointmentList}
                        tableBodyKeys={bodyKeyArray}
                        element="appointment"
                        renderBoolean={isAdmin}
                    />
                }
            </table>
        </div>
    );

    return ViewAppointments;
};

export default ViewAppointment;
