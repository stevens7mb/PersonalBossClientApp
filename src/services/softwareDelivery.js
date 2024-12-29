import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Función para generar una URL firmada
export const generateSignedUrl = async (email) => {
    try {
        const response = await axios.post(
            API_URL + 'generate-signed-url',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data; // Regresa la URL firmada
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Función para reenviar la URL firmada
export const resendSignedUrl = async (email) => {
    try {
        const response = await axios.post(
            API_URL + 'resend-signed-url',
            { email },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data; // Regresa la URL firmada reenviada
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
