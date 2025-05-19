import React, { useEffect, useRef } from 'react'
import { useChat } from '../store/useChat';
import ChatHeader from './skeletons/ChatHeader';
import MessageInput from './skeletons/MessageInput';
import MessageSkeleton from './skeletons/MessageSkeleton';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../utils/formater';

const ChatContainer = () => {
        const { messages, isMessagesLoading, getMessages, selectedUser, subscripeMessages, unsubscripeMessages } = useChat();
        const { authUser } = useAuthStore();
        const messageEndRef = useRef();
        useEffect(() => {
                getMessages(selectedUser._id);
                subscripeMessages();
                return () => unsubscripeMessages();
        }, [selectedUser._id, getMessages, unsubscripeMessages, subscripeMessages]);
        useEffect(() => {
                if (messageEndRef.current && messages) {
                        messageEndRef.current.scrollIntoView({ behavior: "smooth" });
                }
        }, [messages]);

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
                                        <div key={message._id} className={`chat ${message.senderId === authUser.data._id ? "chat-end" : "chat-start"}`} ref={messageEndRef}>
                                                <div className="chat-image avatar">
                                                        <div className="size-10 rounded-full">
                                                                <img
                                                                        alt={message.senderId === authUser.data._id ? authUser.data.fullName : selectedUser.fullName}
                                                                        src={message.senderId === authUser.data._id ? authUser.data.profilePic || "/avatar.png" : selectedUser.profilePic || "/avatar.png"} />
                                                        </div>
                                                </div>
                                                <div className="chat-header mb-1">
                                                        <time className="text-xs opacity-50 ml-1">
                                                                {formatMessageTime(message.createdAt)}
                                                        </time>
                                                </div>
                                                <div className="chat-bubble flex flex-col">
                                                        {message.image && message.senderId === authUser.data._id  && <img src={message.image} alt={message.text} className='sm:max-w-[200px] rounded-2xl' />}
                                                        {message.text && <p>{message.text}</p>}
                                                </div>
                                        </div>
                                ))}
                        </div>
                        <MessageInput />
                </div>
        )
}

export default ChatContainer
