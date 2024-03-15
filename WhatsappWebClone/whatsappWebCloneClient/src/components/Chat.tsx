import { Image } from 'react-bootstrap';
import { accentColor, frameColor, chatStyle } from '../assets/homeStyles';
import { useSelectedConversation } from '../components/SelectedConversationContext';

interface ChatProps {
    image: string;
    email: string;
    name: string;
    status: string;
    conversationId: number;
    time: string;
}

function Chat({ image, name, status, time, conversationId }: ChatProps) {
    const { selectedConversation, setSelectedConversation } = useSelectedConversation();

    const handleClick = () => {
        setSelectedConversation({ name, conversationId });
    };

    return (
        <div onClick={handleClick} style={{ ...chatStyle.mainContainer, background: selectedConversation?.conversationId==conversationId? accentColor : frameColor }}>
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
