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
import ErrorPage from "@/pages/ErrorPage.tsx";
import JoinWorkspacePage from "@/pages/JoinWorkspacePage.tsx";
import ProjectDashboard from "@/pages/ProjectDashboard.tsx";
import SprintOverview from "@/pages/SprintOverview.tsx";
import TaskDetailPage from "@/pages/TaskDetailPage.tsx";
import RetrospectiveSection from "@/pages/RetrospectiveSection.tsx";
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
                        },
                        {
                            path:'project/:projectId',
                            element: <ProjectDashboard/>
                        },
                        {
                            path:'project/:projectId/sprint/:sprintId',
                            element:<SprintOverview/>
                        },
                        {
                            path:'/workspaces/:id/retrospective',
                            element: <RetrospectiveSection/>
                        }
                    ]
                },
                {
                    path: 'project/:projectId/tasks-details/:taskId',
                    element: <TaskDetailPage />
                },
                {
                    path: 'project/:projectId/sprint/:sprintId/tasks-details/:taskId',
                    element: <TaskDetailPage />
                },
                {
                    path:'/create',
                    element:<OnboardingScreen/>
                },
                {
                    path: 'invite/:code',
                    element: <JoinWorkspacePage/>
                },
            ]
        },
        {
            path : "*",
            element : <ErrorPage/>
        }

    ]
)