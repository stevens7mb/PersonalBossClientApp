import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL + 'register', userData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
export const verifyOtp = async (otpData) => {
    try {
        const response = await axios.post(API_URL + 'verify-otp', otpData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
