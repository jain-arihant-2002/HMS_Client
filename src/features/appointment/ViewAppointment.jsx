import useAuth from "../../hooks/useAuth";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";

const ViewAppointment = () => {
    const { data: Appointments, isLoading } = useGetAppointmentsQuery();
    const { isAdmin } = useAuth();
    const headerArray = ["AppointmentID","DName", "PName", "Date", "Time"];
    const bodyKeyArray = ["AppointmentID", "Doctor", "Patient", "Date", "Time",];

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
