import { useState } from "react";
import type { ILoginData, ILoginPayload } from '@/types/login';
import { IApiError } from "@/types/error";
import { loginUser } from "@/api/authApi";
import LocalStorageService from "@/services/LocalStorage";

interface IUserLogin {
    login: (data: ILoginData) => Promise<void>;
    loading: boolean;
    error: IApiError | string | null;
    success: boolean
}


export const useLogin = (): IUserLogin => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    const login = async (data: ILoginData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const payload: ILoginPayload = {
                username: data.username,
                password: data.password
            }
            const response = await loginUser(payload);
            const token = response?.data?.token || null;
            if (token) {
                LocalStorageService.setItem(LocalStorageService.AUTH_TOKEN, token);
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

    return { login, loading, error, success };
};