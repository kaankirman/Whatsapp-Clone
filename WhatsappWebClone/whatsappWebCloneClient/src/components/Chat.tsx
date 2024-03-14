import { Image } from 'react-bootstrap';
import { accentColor, frameColor, chatStyle } from '../assets/homeStyles';
import { SelectedConversation } from '../pages/Home';

interface ChatProps {
    image: string;
    email: string;
    name: string;
    status: string;
    conversationId: number; // Corrected the type to lowercase 'number'
    time: string;
    onSelect: (selectedConversation:SelectedConversation) => void; // Updated onSelect function to accept a conversationId
    isSelected: boolean;
}

function Chat({ image, name, status, time, conversationId, onSelect, isSelected }: ChatProps) {

    const selectedConversation = {
        name: name,
        conversationId: conversationId,
    }
    const handleClick = () => {
        onSelect(selectedConversation); // Pass conversationId to the onSelect function
    };

    return (
        <div onClick={handleClick} style={{ ...chatStyle.mainContainer, background: isSelected ? accentColor : frameColor }}>
            <div style={chatStyle.userContainer}>
                <Image src={image} roundedCircle style={chatStyle.userImage} />
                <div style={chatStyle.userTextContainer}>
                    <h3 style={chatStyle.userText}>{name}</h3>
                    <p style={chatStyle.userText}>{status}</p>
                </div>
            </div>
            <p style={chatStyle.userText}>{time}</p>
        </div>
    );
}

export default Chat;
