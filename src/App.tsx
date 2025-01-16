import {RouterProvider} from "react-router-dom";
import {router} from "@/constants/routes.tsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {apiClient, setHeader} from "@/service/api.client.ts";
import {useEffect} from "react";


const App = () => {
    const header = useAuthHeader();
    useEffect(() => {
        if (header) setHeader(header)
        return () => {
        apiClient.interceptors.request.clear();
    }
    }, [header]);
    return (<RouterProvider router={router}/>)

}

export default App;