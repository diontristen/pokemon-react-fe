import { useState } from "react";
import type { IRegisterData, IRegisterPayload } from '@/types/register';
import { registerUser } from "@/api/authApi";
import { IApiError } from "@/types/error";


interface IUserRegister {
    register: (data: IRegisterData) => Promise<void>;
    loading: boolean;
    error: IApiError | string | null;
    success: boolean
}


export const useRegister = (): IUserRegister => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<IApiError | string | null>(null);

    const register = async (data: IRegisterData): Promise<void> => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const payload: IRegisterPayload = {
                first_name: data.firstName,
                last_name: data.lastName,
                username: data.username,
                password: data.password
            }
            await registerUser(payload);
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

    return { register, loading, error, success };
};