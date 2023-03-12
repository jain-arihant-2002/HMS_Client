import { useRegisterPatientMutation } from "./patientApiSlice";
const RegisterPatient = () => {
    const [registerPatient, { isLoading }] = useRegisterPatientMutation();

    const [Name, setName] = useState("");
    const [selectedGender, setSelectedGender] = useState("male");
    const [Contact, setContact] = useState("");
    const [Address, setAddress] = useState("");

    const handleNameInput = (e) => setName(e.target.value);
    const handleContactInput = (e) => setContact(e.target.value);
    const handleAddressInput = (e) => setAddress(e.target.value);

    const handleAddPatient = async (e) => {
        e.preventDefault();
        try {
            await registerPatient({
                Name,
                Contact,
                Gender: selectedGender,
                Address,
            }).unwrap();
        } catch (error) {
            console.log(error);
        }
    };

    const AddPatient =isLoading ? (
        <h1>Loading...</h1>
    ) : (<>
    
    </>)

    return <div>RegisterPatient</div>;
};

export default RegisterPatient;
