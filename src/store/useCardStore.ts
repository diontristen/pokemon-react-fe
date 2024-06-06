
import { ICard, IQuery } from '@/types/card';
import { create } from 'zustand';



interface ICardStore {
    cards: ICard[] | null;
    localCards: ICard[] | null;
    serverCards: ICard[] | null;
    page: number,
    pageSize: number,
    totalCount: number | null;
    totalPageCount: number | null;
    name: string;
    query: IQuery;
    setCards: (cards: ICard[]) => void;
    updateCards: (id: string, card: ICard) => void;
    removeCards: (id: string) => void;
    setPagination: (totalCount: number, totalPageCount: number) => void;
    setSearchName: (name: string) => void;
    setPage: (page: number) => void;
    setQuery: (query: IQuery) => void;
    clearQuery: () => void;
    clearCards: () => void;
    setLocalCards: (localCards: ICard[]) => void;
    setServerCards: (localCards: ICard[]) => void;
}

export const useCardStore = create<ICardStore>((set) => ({
    cards: null,
    localCards: null,
    serverCards: null,
    page: 1,
    pageSize: 18,
    totalCount: null,
    totalPageCount: null,
    name: '',
    query: {
        name: '',
        sortBy: [],
        sortOrder: [],
        types: []
    },
    setCards: (cards) => set({ cards }),
    updateCards: (id, card) => set((state) => ({
        cards: (state.cards || []).map(item =>
            item.id === id ? { ...item, ...card } : item
        ),
    })),
    removeCards: (id) => set((state) => ({
        cards: (state.cards || []).filter(item => item.id !== id),
    })),
    setPagination: (totalCount, totalPageCount) => set({ totalCount, totalPageCount }),
    setSearchName: (name) => set({ name, page: 1 }),
    setQuery: (query) => set({ query }),
    clearQuery: () => set({
        query: {
            name: '',
            sortBy: [],
            sortOrder: [],
            types: []
        }
    }),
    setPage: (page) => set({ page }),
    clearCards: () => set({ cards: null }),
    setLocalCards: (localCards) => set({ localCards }),
    setServerCards: (serverCards) => set({ serverCards, localCards: serverCards }),
}))