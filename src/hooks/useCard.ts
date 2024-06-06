import { deleteCard, fetchCards, postCard, putCard } from "@/api/cardApi";
import { useCardStore } from "@/store/useCardStore";
import { ICard, ICardQuery, IPostCardPayload } from "@/types/card";
import { IApiError } from "@/types/error";
import { isEmpty } from "@/utils/helper";
import { useEffect, useState } from "react";

interface IBase {
    loading: boolean;
    error: IApiError | string | null;
    success: boolean
}

interface IUseAddCard extends IBase {
    addCard: (data: IPostCardPayload) => Promise<void>;
}

interface IUseGetCard {
    cards: ICard[] | null;
    page: number;
    pageSize: number;
    error: IApiError | string | null;
    loading: boolean;
}
interface IUSeUpdateCard extends IBase {
    updateCard: (id: string, data: IPostCardPayload) => Promise<void>;
}

interface IUSeRemoveCard extends IBase {
    removeCard: (id: string) => Promise<void>;
}



export const useAddCard = (): IUseAddCard => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    const addCard = async (payload: IPostCardPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await postCard(payload);
            const success = response?.success;
            if (success) {
                setSuccess(true);
            } else {
                setError('Something went wrong. Cannot fetch user token');
            }
        } catch (err: any) {
            if (err?.response?.data?.errors) {
                setError(err?.response?.data?.errors);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { addCard, loading, error, success };

}

export const useGetCards = (query: ICardQuery): IUseGetCard => {
    const cards = useCardStore((state) => state.cards);
    const setCards = useCardStore((state) => state.setCards);
    const setServerCards = useCardStore((state) => state.setServerCards);
    const setPagination = useCardStore((state) => state.setPagination);
    const page = useCardStore((state) => state.page);
    const pageSize = useCardStore((state) => state.pageSize);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    useEffect(() => {
        const getCards = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchCards(query);
                const data = response?.data;
                if (data?.data) {
                    setCards(data?.data);
                    setServerCards(data?.data);
                } else {
                    setCards([]);
                    setServerCards([]);
                }
                if (!isEmpty(data?.total)) {
                    let totalPageCount = Number(data?.total) / Number(query.pageSize);
                    totalPageCount = Math.ceil(totalPageCount);
                    setPagination(data?.total, totalPageCount)
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCards();
    }, [query.pageSize, query.name, query.page, query.sortBy, query.sortOrder, query.types]);


    return {
        cards,
        loading,
        page,
        pageSize,
        error
    };
}

export const useUpdateCard = (): IUSeUpdateCard => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    const updateCard = async (id: string, payload: IPostCardPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await putCard(id, payload);
            const success = response?.success;
            if (success) {
                setSuccess(true);
            } else {
                setError('Something went wrong. Cannot fetch user token');
            }
        } catch (err: any) {
            if (err?.response?.data?.errors) {
                setError(err?.response?.data?.errors);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { updateCard, loading, error, success };
}

export const useRemoveCard = (): IUSeRemoveCard => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    const removeCard = async (id: string) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await deleteCard(id);
            setSuccess(true);
        } catch (err: any) {
            if (err?.response?.data?.errors) {
                setError(err?.response?.data?.errors);
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { removeCard, loading, error, success };

}