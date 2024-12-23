import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
    createBrowserRouter, redirect,
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
const router=createBrowserRouter(
    [
        {
            path:'/',
           loader:()=>redirect('/login'),
        },
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
            path:'/dashboard',
            element:<DashboardWrapper/>
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
