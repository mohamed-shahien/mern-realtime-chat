import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useAuthStore = create((set) => ({
        authUser: null,
        isSigninUp: false,
        isLoggingIng: false,
        isUploadingProfile: false,
        isCheckingAuth: false,

        checkAuth: async () => {
                try {
                        const res = await axiosInstance.get("/auth/check");
                        set({ authUser: res.data });
                } catch (error) {
                        console.log(error);
                        set({ authUser: null });
                        
                }finally{
                        set({ isCheckingAuth: false });
                }
        },
}));
