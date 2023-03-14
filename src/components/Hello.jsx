import { useSelector } from "react-redux";
import {selectCurrentUser} from '../features/auth/authSlice' 
const Hello = () => {
    const useName = useSelector(selectCurrentUser)
  return (
    useName && <span>{`Hello, ${useName}!`}</span>
  )
}

export default Hello;