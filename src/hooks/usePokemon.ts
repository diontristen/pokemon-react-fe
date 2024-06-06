import { fetchPokemon } from "@/api/pokemonApi";
import { usePokemonStore } from "@/store/usePokemonStore";
import { IApiError } from "@/types/error";
import { IPokemon, IPokemonQuery } from "@/types/pokemon";
import { isEmpty } from "@/utils/helper";
import { useEffect, useState } from "react";

interface IUseGetPokemon {
    pokemons: IPokemon[] | null;
    page: number;
    pageSize: number;
    error: IApiError | string | null;
    loading: boolean;
}


export const usePokemon = (query: IPokemonQuery): IUseGetPokemon => {
    const pokemons = usePokemonStore((state) => state.pokemons);
    const setPokemons = usePokemonStore((state) => state.setPokemons);
    const setPagination = usePokemonStore((state) => state.setPagination);
    const page = usePokemonStore((state) => state.page);
    const pageSize = usePokemonStore((state) => state.pageSize);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getPokemon = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchPokemon(query);
                const data = response?.data;
                if (data?.data) {
                    setPokemons(data?.data);
                } else {
                    setPokemons([]);
                }
                if (!isEmpty(data?.total)) {
                    let totalPageCount: number = Number(data?.total) / Number(query.pageSize);
                    totalPageCount = Math.ceil(totalPageCount);
                    setPagination(data?.total, total)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getPokemon();
    }, [query.name, query.page, query.pageSize]);

    return {
        pokemons,
        loading,
        page,
        pageSize,
        error
    };
};