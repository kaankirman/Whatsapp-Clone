import { Image } from 'react-bootstrap';
import { accentColor, frameColor, chatStyle } from '../assets/homeStyles';
import { useSelectedConversation } from './Contexts/SelectedConversationContext';
import { useContext, useEffect } from 'react';
import { MessageContext } from './Contexts/MessageContext';
interface ChatProps {
    image: string;
    email: string;
    name: string;
    status: string;
    conversationId: number;
    time: string;
}

interface Message {
    sender_id: string;
    message_text: string;
    send_at: string;
}

function Chat({ image, name, status, time, conversationId }: ChatProps) {
    const { selectedConversation, setSelectedConversation } = useSelectedConversation();
    const { updateMessages } = useContext(MessageContext);
    const serverUrl = import.meta.env.VITE_BASE_URL;

    const handleClick = () => {
        setSelectedConversation({ name, conversationId });
    };

    const fetchMesages = async () => {
        try {
            const response = await fetch(`${serverUrl}/messages/${conversationId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch messages.');
            }
            const data = await response.json();
            const sortedData = data.sort((a: Message, b: Message) => {
                const dateA = new Date(a.send_at).getTime();
                const dateB = new Date(b.send_at).getTime();
                return dateA - dateB;
            });
            updateMessages(conversationId, sortedData);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    useEffect(() => {
        fetchMesages();
    }, []);

    return (
        <div onClick={handleClick} style={{ ...chatStyle.mainContainer, background: selectedConversation?.conversationId == conversationId ? accentColor : frameColor }}>
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
