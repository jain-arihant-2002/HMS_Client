import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const Welcome = () => {
    const user = useSelector(selectCurrentUser);

    return <div>Welcome {user}!</div>;
};

export default Welcome;
