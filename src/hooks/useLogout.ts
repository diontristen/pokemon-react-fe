import LocalStorageService from "@/services/LocalStorage";

interface IUseLogout {
    logout: () => void;
}

export const useLogout = (): IUseLogout => {
    const logout = () => {
        LocalStorageService.removeItem(LocalStorageService.AUTH_TOKEN);
    };

    return { logout };
}