import { useGetPrescriptionsQuery } from "./prescriptionApiSlice";
import TableHeader from "../../components/TableHeader";
import TableRow from "../../components/TableRow";
import useAuth from "../../hooks/useAuth";

const ViewPrescription = () => {
    const { data: Prescription, isLoading } = useGetPrescriptionsQuery();
    const { isPatient, isDoctor, isAdmin } = useAuth();

    if (isLoading) return <h1>Loading...</h1>;

    const PrescriptionList = Prescription.prescription;
    console.log(PrescriptionList);
    
    let headerArray;
    let bodyKeyArray;

    if (isPatient) {
        headerArray = ["PrescriptionID", "DName", "Disease", "Allergy", "Medicine"];
        bodyKeyArray = ["PrescriptionID", "Doctor", "Disease", "Allergy", "Medicine"];
    }
    if (isDoctor) {
        headerArray = ["PrescriptionID", "PName", "Disease", "Allergy", "Medicine"];
        bodyKeyArray = ["PrescriptionID", "Patient", "Disease", "Allergy", "Medicine"];
    }
    if (isAdmin) {
        headerArray = ["PrescriptionID", "DName", "PName", "Disease", "Allergy", "Medicine"];
        bodyKeyArray = ["PrescriptionID", "Doctor", "Patient", "Disease", "Allergy", "Medicine"];
    }

    const ViewPrescription =
        PrescriptionList.length <= 0 ? (
            <div className="tableContainer">
                <h2> No data to show </h2>{" "}
            </div>
        ) : (
            <div className="tableContainer">
                <table>
                    {<TableHeader headers={headerArray} renderBoolean={isDoctor} />}
                    {
                        <TableRow
                            tableBody={PrescriptionList}
                            tableBodyKeys={bodyKeyArray}
                            element="prescription"
                            renderBoolean={isDoctor}
                        />
                    }
                </table>
            </div>
        );
    return ViewPrescription;
};

export default ViewPrescription;
