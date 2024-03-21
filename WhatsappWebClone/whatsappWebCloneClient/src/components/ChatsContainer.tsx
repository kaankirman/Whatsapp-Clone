import { useEffect, useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { chatsContainerStyle } from '../assets/homeStyles';
import { useAppContext } from './Contexts/appContext';

interface Friend {
    email: string;
    name: string;
    status: string;
    url: string;
    conversationId: number;
    lastMessage: string;
}

interface ChatsContainerProps {
    userData: any;
    setFriendCount: React.Dispatch<React.SetStateAction<number>>;
}

const ChatsContainer: React.FC<ChatsContainerProps> = ({ userData, setFriendCount }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [chats, setChats] = useState<Array<Friend>>([]);
    const { messages } = useAppContext().messageContext;
    const { setToast } = useAppContext().toastContext;

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${serverUrl}/friends/${userData.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch friends.');
                }
                const data = await response.json();
                setChats(data);
                setFriendCount(data.length);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error);
                    setToast(error.message);
                } else {
                    console.error('Error', error);
                }
            };
        };
        fetchFriends();
    }, [serverUrl, userData.email]);

    useEffect(() => {
        const sortedChats = chats.map((chat) => {
            const latestMessage = messages[chat.conversationId]?.[messages[chat.conversationId].length - 1];
            return {
                ...chat,
                latestMessageTimestamp: latestMessage ? new Date(latestMessage.send_at).getTime() : 0,
                lastMessage: latestMessage ? latestMessage.message_text : '',
            };
        }).sort((a, b) => b.latestMessageTimestamp - a.latestMessageTimestamp);
        setChats(sortedChats);
    }, [messages]);

    const getTime = (friend:Friend) => {
        const time =messages[friend.conversationId]?.[messages[friend.conversationId].length - 1]?.send_at.split('T')[1].substr(0, 5);
        return time? time: '';
    };

    return (
        <div style={chatsContainerStyle.mainContainer}>
            {chats.map((friend) => (
                <Chat
                    key={friend.conversationId}
                    image={friend.url ? `${serverUrl}/${friend.url}` : profilePlaceholder}
                    email={friend.email}
                    name={friend.name}
                    status={friend.status}
                    lastMessage={friend.lastMessage}
                    conversationId={friend.conversationId}
                    time={getTime(friend)}
                />
            ))}
        </div>
    );
};

export default ChatsContainer;
