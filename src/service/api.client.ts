import axios from "axios";
import { toast } from "sonner";

// Axios client instance setup
export const apiClient = axios.create({
    baseURL: 'https://assignit-backend.onrender.com/api'
});

// Function to set or remove the Authorization header
export const setHeader = (header: string) => {
    apiClient.defaults.headers.Authorization = header ? header : ''; // Set or remove token
};

// List of public routes that don’t require authentication
const PUBLIC_ROUTES = ["/auth/login", "/auth/signup", "/auth/reset-password"];

// Request interceptor for aborting requests without a token
apiClient.interceptors.request.use((config) => {
    const token = config.headers.Authorization;

    // Abort the request if there's no token
    if (!token  && !PUBLIC_ROUTES.includes(config.url || "")) {
        // controller.abort();
        return Promise.reject(new Error("No authentication token"));
    }
        return config;
}, (error) => {
    return Promise.reject(error);
});

// Flag to prevent continuous error messages
let isBackendDown = false;

// Response interceptor for handling errors
apiClient.interceptors.response.use((res) => {
    // Reset the flag if the response is successful
    isBackendDown = false;
    return res;
}, (err) => {
    if (err.message === "No authentication token") {
        return Promise.reject(err);
    }

    // Handle network errors or backend unavailability
    if (!err.response) {
        if (!isBackendDown) {
            isBackendDown = true;
            window.location.href = '/error';
            setTimeout(()=>{
                toast.error("The backend is currently unreachable. Please try again later.", {
                    duration: 3000,
                    id: 'backend-down',
                });
            },1000)
        }
        return Promise.reject(new Error("Backend is unreachable"));
    }

    // Handle specific HTTP status codes
    if (err.response.status === 422) {
        window.location.href = '/error';
    } else if (err.response.status === 401) {
        toast.warning("Session expired. Please re-login again.");
        window.location.href = '/login';
    } else {
        toast.error(err.response?.data?.message || "An error occurred", {
            duration: 2000,
            id: 'error',
        });
    }

    return Promise.reject(err);
});
