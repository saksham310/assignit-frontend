import Switcher from "@/components/custom-components/shared/Switcher.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {useGetWorkspace} from "@/hooks/workspace.hooks.ts";
import {useWorkspaceRoleStore, useWorkspaceStore} from "@/store/workspace.store.ts";
import {useEffect} from "react";

const WorkspaceSwitcher=()=>{
    const {id}=useParams();
    const {data}=useGetWorkspace();
    const setCurrentRole = useWorkspaceRoleStore((state)=> state.setCurrentRoles)
    const setWorkspaceRoles = useWorkspaceRoleStore((state)=> state.setRoles);
    const navigate = useNavigate();
    const setCurrentWorkspaceId=useWorkspaceStore((state)=>state.setCurrentWorkspaceId);
    useEffect(()=>{
        if(!!id) {
            setCurrentWorkspaceId(id);
        }
        if(!!data) setWorkspaceRoles(data);

    },[id,data]);

    const onChange=(id:string)=>{
        setCurrentWorkspaceId(id);
        setCurrentRole(id);
        navigate(`/workspaces/${id}`)
    }
    return <>
        <div>
            <Switcher onChange={onChange} data={data} />
        </div>

    </>
}
export default WorkspaceSwitcher;