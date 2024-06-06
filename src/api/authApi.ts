import axios from '@/api/axios';
import { ILoginPayload } from '@/types/login';
import { IRegisterPayload } from '@/types/register';

export const registerUser = async (data: IRegisterPayload) => {
    try {
        const response = await axios.post('/register', data);
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};

export const loginUser = async (data: ILoginPayload) => {
    try {
        const response = await axios.post('/login', data);
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        const response = await axios.post('/logout');
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};