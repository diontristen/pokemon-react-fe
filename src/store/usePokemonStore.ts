
import { IPokemon } from '@/types/pokemon';
import { create } from 'zustand';

interface IPokemonStore {
    pokemons: IPokemon[] | null;
    page: number,
    pageSize: number,
    totalCount: number | null;
    totalPageCount: number | null;
    name: string;
    setPokemons: (pokemons: IPokemon[]) => void;
    setPagination: (totalCount: number, totalPageCount: number) => void;
    setSearchName: (name: string) => void;
    setPage: (page: number) => void;
    clearPokemons: () => void;
}

export const usePokemonStore = create<IPokemonStore>((set) => ({
    pokemons: null,
    page: 1,
    pageSize: 18,
    totalCount: null,
    totalPageCount: null,
    name: '',
    setPokemons: (pokemons) => set({ pokemons }),
    setPagination: (totalCount, totalPageCount) => set({ totalCount, totalPageCount }),
    setSearchName: (name) => set({ name, page: 1 }),
    setPage: (page) => set({ page }),
    clearPokemons: () => set({ pokemons: null })
}))