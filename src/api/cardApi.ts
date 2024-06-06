import axios from '@/api/axios';
import { IPostCardResponse, IPostCardPayload, IGetCardResponse, ICardQuery } from '@/types/card';


export const postCard = async (payload: IPostCardPayload): Promise<IPostCardResponse> => {
    try {
        const response = await axios.post<IPostCardResponse>('/cards', payload);
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};

export const putCard = async (id: string, payload: IPostCardPayload): Promise<IPostCardResponse> => {
    try {
        const response = await axios.put<IPostCardResponse>(`/cards/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};

export const deleteCard = async (id: string): Promise<IPostCardResponse> => {
    try {
        const response = await axios.delete<IPostCardResponse>(`/cards/${id}`);
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};



export const fetchCards = async (query: ICardQuery): Promise<IGetCardResponse> => {
    try {
        const response = await axios.get<IGetCardResponse>('/cards', {
            params: query
        });
        return response.data;
    } catch (error) {
        console.error('API error', error);
        throw error;
    }
};