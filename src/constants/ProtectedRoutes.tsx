import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes=()=>{
    const isAuthenticated = useIsAuthenticated();
if(!isAuthenticated){
    return  <Navigate to="/login" replace={true} />;
}
return <Outlet />;

}

export default ProtectedRoutes;