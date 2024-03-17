import { useEffect, useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/bg.jpg';
import { chatsContainerStyle } from '../assets/homeStyles';

interface Friend {
    email: string;
    name: string;
    status: string;
    conversationId: number;
}

interface ChatsContainerProps {
    userData: any;
    setFriendCount: React.Dispatch<React.SetStateAction<number>>;
}

const ChatsContainer: React.FC<ChatsContainerProps> = ({ userData, setFriendCount }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [chats, setChats] = useState<Array<Friend>>([]);
    const image = profilePlaceholder;

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

    return (
        <div style={chatsContainerStyle.mainContainer}>
            {chats.map((friend) => (
                <Chat
                    key={friend.conversationId}
                    image={image}
                    email={friend.email}
                    name={friend.name}
                    status={friend.status}
                    conversationId={friend.conversationId}
                    time=""
                />
            ))}
        </div>
    );
};

export default ChatsContainer;
