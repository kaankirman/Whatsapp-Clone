import React, { createContext, useState, useContext, ReactNode } from 'react';

// User Data Context
export interface UserData {
    name: string;
    status: string;
    email: string;
    url: string;
}

interface UserDataContextType {
    userData: UserData;
    setName: (name: string) => void;
    setStatus: (status: string) => void;
    setEmail: (email: string) => void;
    setUrl: (url: string) => void;
}

// Selected Conversation Context
interface SelectedConversation {
    name: string;
    conversationId: number;
    status: string;
    profileUrl: string;
}

interface SelectedConversationContextType {
    selectedConversation: SelectedConversation | null;
    setSelectedConversation: React.Dispatch<React.SetStateAction<SelectedConversation | null>>;
}

// Message Context
interface Message {
    sender_id: string;
    message_text: string;
    send_at: string;
}

export type Messages = {
    [conversationId: number]: Message[];
};

type UpdateMessages = (conversationId: number, newMessages: Message[]) => void;

interface MessageContextType {
    messages: Messages;
    updateMessages: UpdateMessages;
}

// Toast Context
interface ToastContextType {
    toast: string;
    setToast: (message: string) => void;
}

// Search Conversation Context
interface SearchConversationContextType {
    search: string;
    setSearch: (search: string) => void;
}

// Notification Context
interface Notification {
    count: number;
}

export type Notifications = {
    [conversationId: number]: Notification;
}

type UpdateNotifications = (conversationId: number, newNotifications: Notification) => void;

interface NotificationContextType {
    notifications: Notifications;
    updateNotifications: UpdateNotifications;
}

const AppContext = createContext<{
    userDataContext: UserDataContextType;
    selectedConversationContext: SelectedConversationContextType;
    messageContext: MessageContextType;
    toastContext: ToastContextType;
    notificationContext: NotificationContextType;
    searchConversationContext: SearchConversationContextType;
} | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
};

// App Context Provider
interface AppContextProviderProps {
    children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [url, setUrl] = useState<string>('');
    const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);
    const [messages, setMessages] = useState<Messages>({});
    const [toast, setToast] = useState<string>('');
    const [notifications, setNotifications] = useState<Notifications>({});
    const [search, setSearch] = useState<string>('');

    const userData: UserData = {
        name,
        status,
        email,
        url
    };

    const updateMessages: UpdateMessages = (conversationId, newMessages) => {
        setMessages(prevMessages => ({
            ...prevMessages,
            [conversationId]: newMessages
        }));
    };

    const updateNotifications: UpdateNotifications = (conversationId, newNotifications) => {
        setNotifications(prevNotifications => ({
            ...prevNotifications,
            [conversationId]: newNotifications
        }));
    };

    const userDataContext: UserDataContextType = {
        userData,
        setName,
        setStatus,
        setEmail,
        setUrl
    };

    const selectedConversationContext: SelectedConversationContextType = {
        selectedConversation,
        setSelectedConversation
    };

    const messageContext: MessageContextType = {
        messages,
        updateMessages
    };

    const toastContext: ToastContextType = {
        toast,
        setToast
    };

    const notificationContext: NotificationContextType = {
        notifications,
        updateNotifications
    };

    const searchConversationContext: SearchConversationContextType = {
        search,
        setSearch
    };

    return (
        <AppContext.Provider value={{ userDataContext, selectedConversationContext, messageContext, toastContext, notificationContext,searchConversationContext }}>
            {children}
        </AppContext.Provider>
    );
};
