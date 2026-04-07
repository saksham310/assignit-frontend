import axios from "axios";
import { toast } from "sonner";

// Axios client instance setup
export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'https://assignit-backend.onrender.com/api'
});

// Function to set or remove the Authorization header
export const setHeader = (header: string) => {
    apiClient.defaults.headers.Authorization = header ? header : ''; // Set or remove token
};

// Function to handle logout and cleanup
const handleLogout = () => {
    // Clear auth token from storage
    localStorage.removeItem('_auth');
    localStorage.removeItem('_auth_state');
    localStorage.removeItem('_auth_storage');
    
    // Clear axios default headers
    delete apiClient.defaults.headers.Authorization;
    
    // Redirect to login
    window.location.href = '/login';
};

// List of public routes that don't require authentication
const PUBLIC_ROUTES = ["/auth/login", "/auth/signup", "/auth/reset-password", "/auth/forgot-password", "/auth/verify-otp"];

// Routes that shouldn't show error toasts (valid to have no data)
const SILENT_ERROR_ROUTES = ["/project"];

// Request interceptor for aborting requests without a token
apiClient.interceptors.request.use((config) => {
    const token = config.headers.Authorization;

    // Abort the request if there's no token
    if (!token  && !PUBLIC_ROUTES.includes(config.url || "")) {
        return Promise.reject(new Error("No authentication token"));
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Flags to prevent duplicate error handling
let isBackendDown = false;
let isHandlingAuthError = false;

// Response interceptor for handling errors
apiClient.interceptors.response.use((res) => {
    // Reset the flags if the response is successful
    isBackendDown = false;
    return res;
}, (err) => {
    // Handle "No authentication token" error from request interceptor
    if (err.message === "No authentication token") {
        if (!isHandlingAuthError) {
            isHandlingAuthError = true;
            toast.error("Please login to continue", { id: 'auth-required' });
            setTimeout(() => {
                isHandlingAuthError = false;
                handleLogout();
            }, 500);
        }
        return Promise.reject(err);
    }

    // Handle network errors or backend unavailability
    if (!err.response) {
        if (!isBackendDown) {
            isBackendDown = true;
            toast.error("The backend is currently unreachable. Please try again later.", {
                duration: 5000,
                id: 'backend-down',
            });
            setTimeout(() => {
                window.location.href = '/error';
            }, 1000);
        }
        return Promise.reject(new Error("Backend is unreachable"));
    }

    // Handle specific HTTP status codes
    const status = err.response.status;
    const url = err.config?.url || "";
    const isSilentRoute = SILENT_ERROR_ROUTES.some(route => url.includes(route));
    
    if (status === 401 || status === 440) {
        // Handle authentication/authorization errors
        if (!isHandlingAuthError) {
            isHandlingAuthError = true;
            const message = status === 440 
                ? "Your account session is invalid. Please login again." 
                : "Your session has expired. Please login again.";
            
            toast.warning(message, { 
                id: 'session-expired',
                duration: 3000 
            });
            
            setTimeout(() => {
                isHandlingAuthError = false;
                handleLogout();
            }, 1000);
        }
    } else if (status === 403) {
        toast.error("You don't have permission to perform this action.", {
            duration: 3000,
            id: 'forbidden',
        });
    } else if (status === 422) {
        toast.error("Invalid data provided. Please check your input.", {
            duration: 3000,
            id: 'validation-error',
        });
    } else if (status >= 500) {
        toast.error("Server error. Please try again later.", {
            duration: 3000,
            id: 'server-error',
        });
    } else if (!isSilentRoute) {
        // Generic error handling for other status codes (skip for silent routes)
        toast.error(err.response?.data?.message || "An error occurred", {
            duration: 3000,
            id: 'error',
        });
    }

    return Promise.reject(err);
});
