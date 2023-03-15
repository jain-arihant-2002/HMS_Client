import React from "react";
import { useNavigate } from "react-router-dom";

const TableRow = ({ tableBody, tableBodyKeys, element, renderBoolean }) => {
    const navigate = useNavigate();
    const handleUpdate = (body) => {
        navigate(`/${element}/update`, { state: { body } });
    };
    const handleDelete = (body) => {
        navigate(`/${element}/delete`, { state: { body } });
    };
    const rows = tableBody.map((body, index) => {
        const doctorName = body.Doctor ? body.Doctor.DName : null;
        const patientName = body.Patient ? body.Patient.Name : null;

        return (
            <tr key={index}>
                {tableBodyKeys.map((key) => {
                    if (key === "Doctor" && doctorName) return <td key={doctorName}>{doctorName}</td>;
                    else if (key === "Patient" && patientName)
                        return <td key={patientName}>{patientName}</td>;
                    else return  <td key={key}>{body[key]}</td> ;
                })}
                {/* edit sign */}
                {renderBoolean && (
                    <td className="clickAble" onClick={() => handleUpdate(body)}>
                        &#x270e;
                    </td>
                )}
                {/* Delete sign */}
                {renderBoolean && (
                    <td className="clickAble" onClick={() => handleDelete(body)}>
                        &#x1f5d1;
                    </td>
                )}
            </tr>
        );
    });

    return <tbody>{rows}</tbody>;
};

export default TableRow;
