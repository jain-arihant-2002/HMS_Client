import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import { useGetDoctorsQuery } from "./doctorApiSlice";
import useAuth from "../../hooks/useAuth";

const ViewDoctor = () => {
    const { data: doctors, isLoading } = useGetDoctorsQuery();
    const { isAdmin } = useAuth();

    const headerArray = ["DoctorID", "DName", "Contact", "Department", "Fees"];

    if (isLoading)
        return (
            <div className="tableContainer">
                <h2>Loading...</h2>
            </div>
        );

    const doctorList = doctors.doctor;

    if (doctorList.length <= 0 || !doctorList)
        return (
            <div className="tableContainer">
                <h2>No Data To Show</h2>
            </div>
        );

    const doctorData = (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} renderBoolean={isAdmin} />}
                {
                    <TableRow
                        tableBody={doctorList}
                        tableBodyKeys={headerArray}
                        element="doctor"
                        renderBoolean={isAdmin}
                    />
                }
            </table>
        </div>
    );

    return doctorData;
};

export default ViewDoctor;
