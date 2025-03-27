import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './editor/style/quill-custom.css';
import 'quill/dist/quill.snow.css';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {Toaster} from "sonner";
import AuthProvider from "react-auth-kit";
import App from "@/App.tsx";
import {store} from "@/store/auth.store.ts";

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Toaster richColors position="top-right" />
            <AuthProvider store={store}>
                 <App/>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>,
);
