import { useEffect, useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { chatsContainerStyle } from '../assets/homeStyles';
import { useSelectedConversation } from '../components/SelectedConversationContext';

interface Friend {
    email: string;
    name: string;
    status: string;
    conversationId: number;
}

const ChatsContainer: React.FC<{ userData: any }> = ({ userData }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [chats, setChats] = useState<Array<Friend>>([]);
    const image = profilePlaceholder;
    const { selectedConversation } = useSelectedConversation();

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${serverUrl}/friends/${userData.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch friends.');
                }
                const data = await response.json();
                setChats(data); // Assuming data is an array of friend details
                console.log('Friends:', data);
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [serverUrl, userData.email]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (selectedConversation !== null) {
                try {
                    const response = await fetch(`${serverUrl}/messages/${selectedConversation.conversationId}`);
                    if (!response.ok) {
                        throw new Error('Failed to fetch messages.');
                    }
                    const data = await response.json();
                    // Handle fetched messages
                    console.log('Messages:', data);
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }
        };

        fetchMessages();
    }, [serverUrl, selectedConversation?.conversationId]);

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
