import {create} from 'zustand'

export const useThemeUser = create((set) => ({
        theme: localStorage.getItem('chat-theme') || 'light',
        setTheme: (theme) =>{
                localStorage.setItem('chat-theme', theme)
                set({theme})
        }
}))