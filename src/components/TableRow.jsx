import React from "react";

const TableRow = ({ patients, patientKeys }) => {
    const rows = patients.map((patient) => (
        <tr key={patient.PatientID}>
            {patientKeys.map((key) => (
                <td key={key}>{patient[key]}</td>
            ))}
            {/* edit sign */}
            <td className="clickAble">&#x270e;</td>
            {/* Delete sign */}
            <td className="clickAble">&#x1f5d1;</td>
        </tr>
    ));

    return <tbody>{rows}</tbody>;
};

export default TableRow;
