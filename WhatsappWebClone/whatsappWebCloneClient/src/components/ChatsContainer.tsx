import { useContext, useEffect, useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { chatsContainerStyle } from '../assets/homeStyles';
import { MessageContext } from './Contexts/MessageContext';

interface Friend {
    email: string;
    name: string;
    status: string;
    url: string;
    conversationId: number;
}

interface ChatsContainerProps {
    userData: any;
    setFriendCount: React.Dispatch<React.SetStateAction<number>>;
}

const ChatsContainer: React.FC<ChatsContainerProps> = ({ userData, setFriendCount }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [chats, setChats] = useState<Array<Friend>>([]);
    const { messages } = useContext(MessageContext);

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
                console.error('Error fetching friends:', error);
            }
        };
        fetchFriends();
    }, [serverUrl, userData.email]);
    useEffect(() => {
        console.log('Chats:', chats);
        console.log('Messages:', messages);
        
    }, [messages]);

    useEffect(() => {
        const sortedChats = chats.map((chat) => {
            const latestMessage = messages[chat.conversationId]?.[messages[chat.conversationId].length - 1];
            console.log('Latest message:', latestMessage);
            return {
                ...chat,
                latestMessageTimestamp: latestMessage ? new Date(latestMessage.send_at).getTime() : 0,
                status: latestMessage ? latestMessage.message_text : '',
            };
        }).sort((a, b) => b.latestMessageTimestamp - a.latestMessageTimestamp);
        setChats(sortedChats);
    }, [messages]);

    return (
        <div style={chatsContainerStyle.mainContainer}>
            {chats.map((friend) => (
                <Chat
                    key={friend.conversationId}
                    image={friend.url ? `${serverUrl}/${friend.url}` : profilePlaceholder}
                    email={friend.email}
                    name={friend.name}
                    status={friend.status}
                    conversationId={friend.conversationId}
                    time={`${messages[friend.conversationId]?.[messages[friend.conversationId].length-1]?.send_at.split('T')[1].substr(0, 5)}`}
                />
            ))}
        </div>
    );
};

export default ChatsContainer;
