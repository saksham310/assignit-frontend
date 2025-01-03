import {RouterProvider} from "react-router-dom";
import {router} from "@/constants/routes.tsx";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import {setHeader} from "@/service/apiClient.ts";


const App = () => {
    const header = useAuthHeader();
    if (header) {
        setHeader(header);
    }
    return (<RouterProvider router={router}/>)

}

export default App;