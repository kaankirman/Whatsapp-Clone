import Image from 'react-bootstrap/Image';
import { accentColor, frameColor, chatStyle, defaultStyle } from '../assets/homeStyles';
import { useAppContext } from './Contexts/appContext';
import { useEffect } from 'react';
interface ChatProps {
    image: string;
    email: string;
    name: string;
    status: string;
    conversationId: number;
    lastMessage: string;
    time: string;
}

interface Message {
    sender_id: string;
    message_text: string;
    send_at: string;
}

function Chat({ image, name, status, lastMessage, time, conversationId }: ChatProps) {
    const { selectedConversation, setSelectedConversation } = useAppContext().selectedConversationContext;
    const { updateMessages } = useAppContext().messageContext;
    const { setToast } = useAppContext().toastContext;
    const { notifications, updateNotifications } = useAppContext().notificationContext;
    const { search } = useAppContext().searchConversationContext;
    const serverUrl = import.meta.env.VITE_BASE_URL;

    const handleClick = () => {
        setSelectedConversation({ name, conversationId, status, profileUrl: image });
        updateNotifications(conversationId, { count: 0 });
    };

    const fetchMesages = async () => {
        try {
            const response = await fetch(`${serverUrl}/messages/${conversationId}`);
            updateNotifications(conversationId, { count: 0 });

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
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
    };

    useEffect(() => {
        fetchMesages();
    }, []);

    return (
        (!search || (name && name.toLowerCase().includes(search.toLowerCase()))) ?
            (
                <div onClick={handleClick} style={{ ...chatStyle.mainContainer, background: selectedConversation?.conversationId == conversationId ? accentColor : frameColor }}>
                    <div style={chatStyle.userContainer}>
                        <Image src={image} roundedCircle style={chatStyle.userImage} />
                        <div style={chatStyle.userTextContainer}>
                            <h3 style={chatStyle.userText}>{name}</h3>
                            <p style={chatStyle.latestMessage}>{lastMessage}</p>
                        </div>
                    </div>
                    <div style={defaultStyle.flexColumn}>
                        {notifications[conversationId] && notifications[conversationId].count > 0 && (
                            <div style={chatStyle.notificationContainer}>
                                {notifications[conversationId].count}
                            </div>
                        )}
                        <p style={chatStyle.latestMessageTime}> {time}</p>
                    </div>
                </div>
            ) : null
    );
}

export default Chat;
