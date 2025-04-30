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
                } finally {
                        set({ isCheckingAuth: false });
                }
        },

        signUp: async (data) => {
                set({ isSigninUp: true })
                try {
                        const res = await axiosInstance.post('/auth/signup', data);
                        set({ authUser: res.data })
                        toast.success("user created successfully")
                } catch(error) {
                        toast.error(error.response.data.message);
                } finally {
                        set({ isSigninUp: false })
                }
        },
        logout : async () => {
                try {
                        await axiosInstance.get("/auth/logout");
                        set({ authUser: null });
                        toast.success("User logged out successfully");
                } catch (error) {
                        toast.error(error.response.data.message);
                }
        },
        LogIn: async (data) => {
                try {
                        set({ isLoggingIng: true });
                        const res = await axiosInstance.post("/auth/login", data);
                        set({ authUser: res.data });
                        toast.success("User logged in successfully");
                } catch (error) {
                        toast.error(error.response.data.message);
                } finally {
                        set({ isLoggingIng: false });
                }
        }
}));
