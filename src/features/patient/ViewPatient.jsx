import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import { useGetPatientsQuery } from "./patientApiSlice";
import useAuth from "../../hooks/useAuth";

const ViewPatient = () => {
    const { data: patients, isLoading } = useGetPatientsQuery();
    const { isAdmin } = useAuth();
    const headerArray = ["PatientID", "Name", "Gender", "Contact", "Address", "Bill"];

    console.log(patients)
    if (isLoading)
       return <div className="tableContainer">
            <h1>Loading...</h1>
        </div>;

    const patientList = patients.patient;

    if (patientList.length <= 0 || !patientList)
    return <div className="tableContainer">
            <h1> No data to show </h1>
        </div>;

    const ViewPatient = (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} renderBoolean={isAdmin} />}
                {
                    <TableRow
                        tableBody={patientList}
                        tableBodyKeys={headerArray}
                        element="patient"
                        renderBoolean={isAdmin}
                    />
                }
            </table>
        </div>
    );
    return ViewPatient
};

export default ViewPatient;
