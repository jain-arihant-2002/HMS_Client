import useAuth from "../../hooks/useAuth";
import { useGetAppointmentsQuery } from "./appointmentApiSlice";
import TableHeader from '../../components/TableHeader'
import TableRow from '../../components/TableRow'

const ViewAppointment = () => {
    /* Need to get more data and change headers according */
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
console.log(appointmentList)
    if (appointmentList.length <= 0 || !appointmentList)
        return (
            <div className="tableContainer">
                <h1> No data to show </h1>
            </div>
        );
    const ViewAppointments =  (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} renderBoolean={isAdmin} />}
                {
                    <TableRow
                        tableBody={appointmentList}
                        tableBodyKeys={headerArray}
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
