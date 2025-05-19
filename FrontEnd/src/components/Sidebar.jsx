import React, { useEffect, useState } from 'react'
import { useChat } from '../store/useChat';
import SideBareSkeleton from './skeletons/SideBareSkeleton';
import { Users } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
        const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChat();
        const {onLineUsers} = useAuthStore();
        const [showonlineOnly, setshowonlineOnly] = useState(false);
        useEffect(() => {
                getUsers();
        }, [getUsers])
        const fillteredUsers = showonlineOnly ? users.filter(user => onLineUsers.includes(user._id)) : users;
        if (isUsersLoading) return <SideBareSkeleton />
        return (
                <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
                        <div className="border-b border-base-300 w-full p-5">
                                <div className="flex items-center gap-2">
                                        <Users className="size-6" />
                                        <span className="font-medium hidden lg:block">Contacts</span>
                                </div>
                                <div className="hidden lg:flex mt-3 items-center gap-2">
                                        <label className='cursor-pointer flex items-center gap-2'>
                                        
                                        <input
                                                type="checkbox"
                                                id="show-online-only"
                                                className="toggle toggle-primary"
                                                checked={showonlineOnly}
                                                onChange={(e) => setshowonlineOnly(e.target.checked)}
                                                />
                                        <span className="text-sm">{onLineUsers.length - 1} online</span>
                                                </label>
                                </div>
                        </div>
                        <div className="overflow-y-auto w-full py-3">
                                {fillteredUsers.map((user) => (
                                        <button
                                                key={user._id}
                                                onClick={() => setSelectedUser(user)}
                                                
                                                className={` w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}>
                                                <div className="relative mx-auto lg:mx-0">
                                                        <img
                                                                src={user.profilePic || "/avatar.png"}
                                                                alt={user.name}
                                                                className="size-12 object-cover rounded-full"
                                                        />
                                                        {onLineUsers.includes(user._id) && (
                                                                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full"/>
                                                        )}
                                                </div>
                                                <div className="hidden lg:block text-left min-w-0">
                                                        <div className="font-medium truncate">{user.fullName}</div>
                                                        <div className="text-sm text-zinc-400">
                                                                {onLineUsers.includes(user._id) ? "Online" : "Offline"}
                                                        </div>
                                                </div>
                                        </button>
                                ))}
                                {fillteredUsers.length === 0 && (
                                        <div className="flex items-center justify-center w-full h-full">
                                                <p className="text-sm text-zinc-400">No users found</p>
                                        </div>
                                )}
                        </div>
                </aside>
        )
}

export default Sidebar
