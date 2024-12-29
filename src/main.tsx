import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import AuthLayout from "./layouts/AuthLayout.tsx";
import SignUpPage from "@/pages/sign-up.page.tsx";
import SignInPage from "@/pages/sign-in.page.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import {store} from "@/store/auth/authStore.ts";
import AuthProvider from "react-auth-kit";
import DashboardWrapper from "@/layouts/DashboardWrapper.tsx";
import WorkspacePage from "@/pages/Workspace.page.tsx";
const router=createBrowserRouter(
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
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-right" />
            <AuthProvider store={store}>
                <RouterProvider router={router}/>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
);
