import Switcher from "@/components/custom-components/Switcher.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useGetWorkspace} from "@/hooks/workspaceHooks.ts";
import {useWorkspaceStore} from "@/store/workspace.store.ts";
import {useEffect} from "react";

const WorkspaceSwitcher=()=>{
    const {id}=useParams();
    const {data}=useGetWorkspace();
    const navigate = useNavigate();
    const setCurrentWorkspaceId=useWorkspaceStore((state)=>state.setCurrentWorkspaceId);
    useEffect(()=>{
        if(!!id) setCurrentWorkspaceId(id);
    },[id]);

    const onChange=(id:string)=>{
        setCurrentWorkspaceId(id);
        navigate(`/workspaces/${id}`)
    }
    return <>
        <div>
            <Switcher onChange={onChange} data={data} />
        </div>

    </>
}
export default WorkspaceSwitcher;