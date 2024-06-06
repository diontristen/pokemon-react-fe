import { create } from 'zustand';
import { IPokemon } from '@/types/pokemon';

interface IPokemonModalStore {
    pokemon: IPokemon | null;
    opened: boolean;
    setPokemon: (pokemon: IPokemon) => void;
    closeModal: () => void;
}

export const usePokemonModalStore = create<IPokemonModalStore>((set) => ({
    opened: false,
    pokemon: null,
    setPokemon: (pokemon) => set({ pokemon, opened: true }),
    closeModal: () => set({ pokemon: null, opened: false })
}))