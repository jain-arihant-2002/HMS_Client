const TableHeader = ({ headers  }) => {
    const header = headers.map((header, index) => {
        return <td key={index}>{header}</td>
    });
    return(
<thead>
    {header}
        <td className="updateData">Update</td>
        <td className="deleteData">delete</td>
</thead>
    )
};

export default TableHeader;
