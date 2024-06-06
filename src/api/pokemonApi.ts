import axios from '@/api/axios';
import { IPokemonQuery, IPokemonResponse } from '@/types/pokemon';



export const fetchPokemon = async (query: IPokemonQuery): Promise<IPokemonResponse> => {
    const response = await axios.get<IPokemonResponse>('/pokemon', {
        params: query,
    });
    return response.data;
};