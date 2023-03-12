import React from "react";

const TableRow = ({ patients, patientArray }) => {
    console.log(patients);
    const rows = patients.map((patient, index) => (
        <tr key={index}>
            {patientArray.map((key) => (
                <td key={key}>{patient[key]}</td>
            ))}
        </tr>
    ));

    return <tbody>{rows}</tbody>;
};

export default TableRow;
