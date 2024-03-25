import { useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';
import { chatBoxStyle } from '../assets/homeStyles';
import { io } from 'socket.io-client';
import sendIcon from '../assets/media/sendIcon.png';
import { useAppContext } from './Contexts/appContext';
import backIcon from '../assets/media/backIcon.png';
import MediaQuery from 'react-media';

const serverUrl = import.meta.env.VITE_BASE_URL;
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const socket = io(socketUrl);
let selectedConversationId: number | null;
let allMessages: Messages

interface ChatBoxProps {
    userData: {
        name: string;
        status: string;
        email: string;
    };
    friendCount: number;
}

type Message = {
    sender_id: string;
    message_text: string;
    send_at: string;
}

type Messages = {
    [conversationId: number]: Message[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ userData, friendCount }) => {
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false)
    const { selectedConversation, setSelectedConversation } = useAppContext().selectedConversationContext;
    const { messages, updateMessages } = useAppContext().messageContext;
    const { setToast } = useAppContext().toastContext;
    const { notifications, updateNotifications } = useAppContext().notificationContext;
    const [currentConversation, setCurrentConversation] = useState(selectedConversation);
    const notificationsRef = useRef(notifications);

    useEffect(() => {
        notificationsRef.current = notifications;
    }, [notifications]);
    
    useEffect(() => {
        if (currentConversation?.conversationId === selectedConversation?.conversationId) {
            return;
        }
        else {
            clearChatContent();
            selectedConversationId = selectedConversation?.conversationId ?? null;
            socket.emit('join-conversation', selectedConversation?.conversationId);
            const messagesArray = messages[selectedConversationId!] || [];
            messagesArray.forEach(messageObj => {
                const { message_text, send_at } = messageObj;
                const messageTime = send_at.split('T')[1].substr(0, 5);
                if (messageObj.sender_id === userData.email) {
                    displayOutgoingMessage(message_text, messageTime);
                }
                else {
                    displayIncomingMessage(message_text, messageTime);
                }
            });
            setCurrentConversation(selectedConversation);
        }
    }, [selectedConversation]);

    useEffect(() => {
        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, []);

    useEffect(() => {
        if (friendCount === Object.keys(messages).length) {
            Object.keys(messages).forEach((conversationId) => {
                socket.emit('join-conversation', Number(conversationId));
            });
            allMessages = messages
            setIsLoaded(true)
        }
    }, [messages]);

    const handleReceiveMessage = (message: string, conversationId: number) => {
        if (selectedConversationId === conversationId) {
            displayIncomingMessage(message, new Date().toISOString().split('T')[1].substr(0, 5));
        } else {
            const currentNotification = notificationsRef.current[conversationId];
            const updatedNotification = { count: currentNotification.count + 1 };
            updateNotifications(conversationId, updatedNotification);
        }
        handleAddMessagesToState(conversationId, { sender_id: "other", message_text: message, send_at: new Date().toISOString() });
    };

    const sendMessage = () => {
        if (message.trim() === '') return;
        const time = new Date().toISOString();
        displayOutgoingMessage(message, time.split('T')[1].substr(0, 5));
        handleAddMessagesToState(selectedConversationId!, { sender_id: userData.email, message_text: message, send_at: time });
        socket.emit('send-message', message, selectedConversationId);
        handleSendMessage();
        setMessage('');
    };

    const handleAddMessagesToState = (conversationId: number, newMessage: Message) => {
        const currentMessages = allMessages[conversationId] || [];
        const updatedMessages = [...currentMessages, newMessage];
        updateMessages(conversationId, updatedMessages);
    };

    const handleSendMessage = async () => {
        try {
            const response = await fetch(`${serverUrl}/messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: userData.email,
                    conversationId: selectedConversationId,
                    message: message,
                }),
            });
            if (!response.ok) {
                throw new Error('error sending message');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
    };

    const displayIncomingMessage = (message: string, messageTime: string) => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            const timeDiv = document.createElement('div');
            messageDiv.textContent = message;
            timeDiv.textContent = messageTime;
            Object.assign(messageDiv.style, chatBoxStyle.incomingMessageText);
            Object.assign(timeDiv.style, chatBoxStyle.incomingMessageTimeText);
            messageDiv.appendChild(timeDiv);
            chatContent.appendChild(messageDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    };

    const displayOutgoingMessage = (message: string, messageTime: string) => {
        if (message.trim() === '') return;

        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            const timeDiv = document.createElement('div');
            messageDiv.textContent = message;
            timeDiv.textContent = messageTime;
            Object.assign(messageDiv.style, chatBoxStyle.outgoingMessageText);
            Object.assign(timeDiv.style, chatBoxStyle.outgoingMessageTimeText);
            messageDiv.appendChild(timeDiv);
            chatContent.appendChild(messageDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    };

    const clearChatContent = () => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            chatContent.innerHTML = '';
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <>
            {isLoaded ? (<div style={chatBoxStyle.mainContainer}>
                {selectedConversation ? (<div style={chatBoxStyle.userContainer}>
                    <Image src={selectedConversation.profileUrl} roundedCircle style={chatBoxStyle.userIcon} />
                    <div style={chatBoxStyle.userTextContainer}>
                        <h3 style={chatBoxStyle.userName}>{selectedConversation?.name}</h3>
                        <p style={chatBoxStyle.userStatus}>{selectedConversation?.status}</p>
                    </div>
                </div>) : null}
                <div id="chatContent" style={chatBoxStyle.chatContent}>
                    {/* Content of the chat box */}
                    <p style={chatBoxStyle.placeHolderText}>Nothing to show</p>
                </div>
                <div style={{ ...chatBoxStyle.inputContainer }}>
                    {selectedConversation ? (<div style={chatBoxStyle.inputBorder}>
                        <MediaQuery query="(max-width: 768px)">
                            {matches =>
                                matches ? (
                                    <img src={backIcon} style={chatBoxStyle.backIcon} alt="Back" onClick={() => setSelectedConversation(null)} />
                                ) : null
                            }
                        </MediaQuery>
                        <input style={chatBoxStyle.messageInput} placeholder="Type a message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        {message ? (<img src={sendIcon} style={chatBoxStyle.sendIcon} onClick={sendMessage} alt="Send" />) : null}
                    </div>) : null}
                </div>
            </div>) : null}
        </>
    );
}

export default ChatBox;
