import { create } from 'zustand';
import { axiosInstance } from '../utils/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

export const useChat = create((set, get) => ({
        messages: [],
        users: [],
        selectedUser: null,
        isUsersLoading: false,
        isMessagesLoading: false,

        getUsers: async () => {
                set({ isUsersLoading: true });
                try {
                        const res = await axiosInstance.get("/messages/users");
                        set({ users: res.data.data });
                                } catch (error) {
                        toast.error(error.response.data.message);
                } finally {
                        set({ isUsersLoading: false });
                }
        },
        getMessages: async (userId) => {
                set({ isMessagesLoading: true });
                try {
                        const res = await axiosInstance.get(`/messages/${userId}`);
                        set({ messages: res.data.data });
                } catch (error) {
                        toast.error(error.response.data.message);
                } finally {
                        set({ isMessagesLoading: false });
                }
        },
        sendMessage: async (messageData) => {
                const { selectedUser, messages } = get();
                try {
                        const res = await axiosInstance.post(`/messages/send/${selectedUser._id} `, messageData);
                        set({ messages: [...messages, res.data.data] });
                } catch (error) {
                        console.log(error?.response?.data?.message || "Something went wrong while sending the message");
                }
        },
        subscripeMessages:  () => {
                const { selectedUser } = get();
                if(!selectedUser) return;
                const socket = useAuthStore.getState().sockit;
                socket.on("message", (message) => {
                        set({ messages: [...get().messages, message] });
                });
                
        },
        unsubscripeMessages: () => {
                const socket = useAuthStore.getState().sockit;
                socket.off("message");
        },
        setSelectedUser: (selectedUser) => {
                set({ selectedUser});
        },
}));