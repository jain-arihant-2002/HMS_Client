const TableHeader = ({ headers ,renderBoolean}) => {
    const header = headers.map((header, index) => {
        return <td key={index}>{header}</td>;
    });
    return (
        <thead>
            <tr>
                {header}
                {renderBoolean &&<td className="updateData">Update</td>}
                {renderBoolean &&<td className="deleteData">delete</td>}
            </tr>
        </thead>
    );
};

export default TableHeader;
