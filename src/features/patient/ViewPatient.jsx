import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import { useGetPatientsQuery } from "./patientApiSlice";
import useAuth from "../../hooks/useAuth";

const ViewPatient = () => {
    /* Add option to add prescription from here also */
    const { data: patients, isLoading } = useGetPatientsQuery();
    const { isAdmin } = useAuth();
    const headerArray = ["PatientID", "Name", "Gender", "Contact", "Address", "Bill"];

    if (isLoading)
        return (
            <div className="tableContainer">
                <h2>Loading...</h2>
            </div>
        );

    const patientList = patients.patient;

    if (patientList.length <= 0 || !patientList)
        return (
            <div className="tableContainer">
                <h2> No data to show </h2>
            </div>
        );

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
    return ViewPatient;
};

export default ViewPatient;
