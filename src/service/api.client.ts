import axios from "axios";
import { toast } from "sonner";

// Axios client instance setup
export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
});

// Function to set or remove the Authorization header
export const setHeader = (header: string) => {
    apiClient.defaults.headers.Authorization = header ? header : ''; // Set or remove token
};

// Request interceptor for aborting requests without a token
apiClient.interceptors.request.use((config) => {
    const controller = new AbortController();
    const token = config.headers.Authorization;

    // Abort the request if there's no token
    if (!token) {
        controller.abort();
    }

    return {
        ...config,
        signal: controller.signal,
    };
}, (error) => {
    return Promise.reject(error);
});

// Response interceptor for handling errors
apiClient.interceptors.response.use((res) => {
    return res; // Return the response if successful
}, (err) => {
    // Show error message using toast if the request fails
    toast.error(err.response?.data?.message || "An error occurred", {
        duration: 2000,
    });

    return Promise.reject(err); // Reject the promise to propagate the error
});
