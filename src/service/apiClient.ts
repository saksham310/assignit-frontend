import axios from "axios";

export const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Base URL for all requests
    headers: {
        'Content-Type': 'application/json', // Default headers
    },
});

