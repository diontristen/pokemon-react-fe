import axios from '@/api/axios';

export const fetchUserData = async () => {
    try {
        const response = await axios.get('/user');
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};
