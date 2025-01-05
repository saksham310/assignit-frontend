import Switcher from "@/components/shared/Switcher.tsx";
import {useNavigate} from "react-router-dom";
import {useGetWorkspace} from "@/hooks/workspaceHooks.ts";

const WorkspaceSwitcher=()=>{
    const {data}=useGetWorkspace();
    const navigate = useNavigate();
    const onChange=(id:string)=>{
        navigate(`/workspaces/${id}`)
    }
    return <>
        <Switcher onChange={onChange} data={data} />
    </>
}
export default WorkspaceSwitcher;