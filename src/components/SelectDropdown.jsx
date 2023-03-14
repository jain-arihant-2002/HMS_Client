const SelectDropdown = ({ name, array, optionHeading, optionValue, keyName, setState }) => {
    return (
        <select
            defaultValue={null}
            name={name}
            onChange={(e) => {
                setState(e.target.value);
                if (!Number.isInteger(parseInt(e.target.value))) setState(null)
            }}
        >
            <option value={null}>{optionHeading}</option>
            {array.map((arrayItem) => (
                <option key={arrayItem[keyName]} value={arrayItem[keyName]}>
                    {arrayItem[optionValue]}
                </option>
            ))}
        </select>
    );
};

export default SelectDropdown;
