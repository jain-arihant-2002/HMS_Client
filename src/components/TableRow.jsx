import React from "react";

const TableRow = ({ tableBody, tableBodyKeys }) => {
    const rows = tableBody.map((body, index) => (
        <tr key={index}>
            {tableBodyKeys.map((key) => (
                <td key={key}>{body[key]}</td>
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
