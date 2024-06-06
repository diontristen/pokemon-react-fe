import { fetchUserData } from "@/api/userApi";
import { useUserStore } from "@/store/useUserStore";
import { IUser } from "@/types/user";
import { isEmpty } from "@/utils/helper";
import { useState } from "react";

interface IBaseUser {
    resetError: () => void;
    loading: boolean;
    error: string | null;
}

interface IUseUser extends IBaseUser {
    getUser: () => Promise<void>;
    user: IUser | null,
}


export const useUser = (): IUseUser => {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getUser = async (): Promise<void> => {
        setLoading(true);
        setError('');
        try {
            const response = await fetchUserData();
            const { data } = response;
            if (!isEmpty(data)) {
                setUser(data);
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

    const resetError = () => {
        setError('');
    }

    return {
        getUser,
        resetError,
        user,
        loading,
        error
    };
};