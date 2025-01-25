import {createBrowserRouter} from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import SignUpPage from "@/pages/SignUpPage.tsx";
import SignInPage from "@/pages/SignInPage.tsx";
import DashboardLayout from "@/layouts/DashboardLayout.tsx";
import WorkspaceDashboard from "@/pages/WorkspaceDashboard.tsx";
import ProtectedRoutes from "@/constants/ProtectedRoutes.tsx";
import OnboardingScreen from "@/pages/OnboardingScreen.tsx";
import SettingsPage from "@/pages/SettingsPage.tsx";
import ResetPasswordPage from "@/pages/ResetPasswordPage.tsx";
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

                },
                {
                    path:'/reset-password',
                    element: <ResetPasswordPage/>
                }
            ]
        },
        {
            path:'/',
            element:<ProtectedRoutes/>,
            children:[
                {
                    path:'',
                    element: <DashboardLayout/>,
                    children:[
                        {
                            path: '/workspaces/:id',
                            element: <WorkspaceDashboard/>,

                        },
                        {
                            path:'/settings',
                            element:<SettingsPage/>
                        }
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