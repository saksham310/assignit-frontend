import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import SignUpPage from "@/pages/SignUpPage.tsx";
import SignInPage from "@/pages/SignInPage.tsx";
import DashboardWrapper from "@/layouts/DashboardWrapper.tsx";
import WorkspaceDashboard from "@/pages/WorkspaceDashboard.tsx";
import ProtectedRoutes from "@/constants/ProtectedRoutes.tsx";
import OnboardingScreen from "@/pages/OnboardingScreen.tsx";
export const router=createBrowserRouter(
    [
        {
            element:<AuthLayout/>,
            children:[
                {
                    path:'/sign-up',
                    element:<SignInPage/>
                },
                {
                    path:'/login',
                    element: <SignInPage/>,

                }
            ]
        },
        {
            path:'/',
            element:<ProtectedRoutes/>,
            children:[
                {
                    path:'',
                    element: <DashboardWrapper/>,
                    children:[
                        {
                            path: 'workspaces/:id',
                            element: <WorkspaceDashboard/>,
                        },
                    ]
                },
                {
                    path:'/create',
                    element:<OnboardingScreen/>
                }
            ]
        }

    ]
)