import React, { useEffect } from 'react'
import { useChat } from '../store/useChat';
import ChatHeader from './skeletons/ChatHeader';
import MessageInput from './skeletons/MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
        const { messages, isMessagesLoading, getMessages, selectedUser } = useChat();
        const { authUser } = useAuthStore();
        useEffect(() => {
                getMessages(selectedUser._id);
        }, [selectedUser._id, getMessages]);

        if (isMessagesLoading) return <div className="flex-1 flex-col flex overflow-auto">
                <ChatHeader />
                <MessageSkeleton />
                <MessageInput />
        </div>
        return (
                <div className='flex-1 flex flex-col overflow-auto'>
                        <ChatHeader />
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                        <div key={message._id} className={`chat ${message.senderId === authUser._id ? "chat-start" : "chat-end"}`}>
                                                <div className="chat-image avatar">
                                                        <div className="size-10 rounded-full">
                                                                <img
                                                                        alt={message.senderId === authUser._id ? authUser.fullName : selectedUser.fullName}
                                                                        src={message.senderId === authUser._id ? authUser.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"}/>
                                                        </div>
                                                </div>
                                                <div className="chat-bubble">
                                                        {message.text}
                                                </div>
                                        </div>
                                ))}
                        </div>
                        <MessageInput />
                </div>
        )
}

export default ChatContainer
