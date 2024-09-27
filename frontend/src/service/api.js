import axios from 'axios';
import config from "./config";

const apiService = {
    signup: async (userData) => {
        try {
            const response = await axios.post(`${config.apiBaseUrl}/api/signup`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data?.msg || "An unexpected error occurred. Please try again.";
        }
    },

    login: async (credentials) => {
        try {
            const response = await axios.post(`${config.apiBaseUrl}/api/login`, credentials);
            return response.data;
        } catch (error) {
            throw error.response?.data?.msg || "An unexpected error occurred. Please try again.";
        }
    }
};

export default apiService;