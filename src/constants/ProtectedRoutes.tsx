import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import {useJoinWorkspaceStore} from "@/store/workspace.store.ts";

const ProtectedRoutes=()=>{
    const isAuthenticated = useIsAuthenticated();
    const {code} =useParams();
    const location = useLocation();
    const setRedirectUrl = useJoinWorkspaceStore((state:any) => state.setRedirectUrl);
if(!isAuthenticated){
    if(!!code){
      setRedirectUrl(location.pathname + location.search);
    }
    return  <Navigate to="/about" replace={true} />;
}
return <Outlet />;

}

export default ProtectedRoutes;