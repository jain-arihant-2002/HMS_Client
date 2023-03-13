import React from "react";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import { useGetPatientsQuery } from "./patientApiSlice";

const ViewPatients = () => {
    const { data: patients, isLoading } = useGetPatientsQuery();
    console.log(patients);

    let ViewPatient;

    if (isLoading) return (ViewPatient = <h1>Loading...</h1>);
    if (!patients) return (ViewPatient = <h1> No data to show </h1>);

    const headerArray = ["PatientID", "Name", "Gender", "Contact", "Address", "Bill"];

    const patientList = patients.patient
    ViewPatient = (
        <div className="tableContainer">
            <table>
                {<TableHeader headers={headerArray} />}
                {<TableRow patients={patientList} patientKeys={headerArray} />}
            </table>
        </div>
    );
    return ViewPatient;
};

export default ViewPatients;
