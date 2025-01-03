import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import SignUpPage from "@/pages/sign-up.page.tsx";
import SignInPage from "@/pages/sign-in.page.tsx";
import DashboardWrapper from "@/layouts/DashboardWrapper.tsx";
import WorkspacePage from "@/pages/Workspace.page.tsx";

export const router=createBrowserRouter(
    [
        {
            element:<AuthLayout/>,
            children:[
                {
                    path:'/sign-up',
                    element:<SignUpPage/>
                },
                {
                    path:'/login',
                    element: <SignInPage/>,

                }
            ]
        },
        {
            path:'/',
            element:<DashboardWrapper/>,
            children:[
                {
                    path: 'workspaces/:id',
                    element: <WorkspacePage/>,
                }
            ]
        }
    ]
)