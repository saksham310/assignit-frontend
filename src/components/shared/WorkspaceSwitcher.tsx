import Switcher from "@/components/shared/Switcher.tsx";
import {useNavigate} from "react-router-dom";

const WorkspaceSwitcher=()=>{
    const navigate = useNavigate();
    const onChange=(id:string)=>{
        navigate(`/workspaces/${id}`)
    }
    return <Switcher onChange={onChange} />
}
export default WorkspaceSwitcher;