// ChatsContainer.jsx

import { useState } from 'react';
import Chat from './Chat';
import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { chatsContainerStyle } from '../assets/homeStyles';

function ChatsContainer() {
    const [selectedChatIndex, setSelectedChatIndex] = useState<number | null>(null); // Specify the type as number or null
    const image = profilePlaceholder;

    const handleChatSelect = (index: number | null) => {
        setSelectedChatIndex(index);
    };

    return (
        <div style={chatsContainerStyle.mainContainer}>
            {[...Array(16)].map((_, index) => (
                <Chat
                    key={index}
                    image={image}
                    name={`User ${index + 1}`}
                    message="Hey there! I am using WhatsApp"
                    time="10:00 PM"
                    onSelect={() => handleChatSelect(index)}
                    isSelected={index === selectedChatIndex}
                />
            ))}
        </div>
    );
}

export default ChatsContainer;
