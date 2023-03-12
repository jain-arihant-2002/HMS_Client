const TableHeader = ({ headers  }) => {
    const header = headers.map((header, index) => {
        return <td key={index}>{header}</td>
    });
    return(
<thead>
    {header}

</thead>
    )
};

export default TableHeader;
