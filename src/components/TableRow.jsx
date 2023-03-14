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
    const rows = tableBody.map((body, index) => (
        <tr key={index}>
            {tableBodyKeys.map((key) => (
                <td key={key}>{body[key]}</td>
            ))}
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
    ));

    return <tbody>{rows}</tbody>;
};

export default TableRow;
