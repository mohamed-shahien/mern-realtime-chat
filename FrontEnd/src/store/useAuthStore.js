import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';

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
        signUP: async (data) => {
                set({isSigninUp: true})
                try {
                        const res = await axiosInstance.post('/auth/signup',data);
                        set({authUser: res.data})
                        toast.success("logined in")
                        res.data
                } catch {
                        toast.error("bade reqest")
                }
        }
}));
