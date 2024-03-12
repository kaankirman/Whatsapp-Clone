// ChatsContainer.jsx

import { useEffect, useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { chatsContainerStyle } from '../assets/homeStyles';

interface ChatsContainerProps {
    userData: {
        name: string;
        status: string;
        email: string;
    };
}

interface Friend {
    name: string;
    status: string;
}

const ChatsContainer: React.FC<ChatsContainerProps> = ({ userData }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [chats, setChats] = useState<Array<Friend>>([]);
    const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null); // Specify the type as number or null
    const image = profilePlaceholder;

    const handleChatSelect = (index: number | null) => {
        setSelectedChatIndex(index);
    };

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const response = await fetch(`${serverUrl}/friends/${userData.email}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch friends.');
                }
                const data = await response.json();
                setChats(data); // Assuming data is an array of friend details
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [serverUrl, userData.email]);


    return (
        <div style={chatsContainerStyle.mainContainer}>
            {chats.map((friend, index) => (
                <Chat
                    key={index}
                    image={image} // Update this with the actual friend's image
                    name={friend.name} // Update this with the actual friend's name
                    status={friend.status} // Update this with the actual friend's status
                    time="" // You may want to modify this based on your requirements
                    onSelect={() => handleChatSelect(index)}
                    isSelected={index === selectedChatIndex}
                />
            ))}
        </div>
    );
};

export default ChatsContainer;
