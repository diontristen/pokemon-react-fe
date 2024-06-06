import { create } from 'zustand';
import { ICard } from '@/types/card';

interface ICardModalStore {
    card: ICard | null;
    opened: boolean;
    setCard: (card: ICard) => void;
    closeModal: () => void;
}

export const useCardModalStore = create<ICardModalStore>((set) => ({
    opened: false,
    card: null,
    setCard: (card) => set({ card, opened: true }),
    closeModal: () => set({ card: null, opened: false })
}))