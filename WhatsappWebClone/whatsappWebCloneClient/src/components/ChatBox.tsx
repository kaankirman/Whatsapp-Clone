import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { useState, useEffect, useContext } from 'react';
import { Image } from 'react-bootstrap';
import { chatBoxStyle } from '../assets/homeStyles';
import { io } from 'socket.io-client';
import sendIcon from '../assets/media/sendIcon.png';
import { useSelectedConversation } from './Contexts/SelectedConversationContext';
import { MessageContext } from './Contexts/MessageContext';

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
}

type Messages = {
    [conversationId: number]: Message[];
};

const ChatBox: React.FC<ChatBoxProps> = ({ userData, friendCount }) => {
    const [message, setMessage] = useState('');
    const [isLoaded, setIsLoaded] = useState(false)
    const { selectedConversation } = useSelectedConversation();
    const { messages, updateMessages } = useContext(MessageContext);

    useEffect(() => {
        clearChatContent();
        selectedConversationId = selectedConversation?.conversationId ?? null;
        socket.emit('join-conversation', selectedConversation?.conversationId);
        const messagesArray = messages[selectedConversationId!] || [];
        messagesArray.forEach(messageObj => {
            const { message_text } = messageObj;
            console.log(userData.email);
            if (messageObj.sender_id === userData.email) {
                displayOutgoingMessage(message_text);
            }
            else {
                displayIncomingMessage(message_text);
            }
        });
    }, [selectedConversation]);

    useEffect(() => {
        const handleReceiveMessage = (message: string, conversationId: number) => {
            if (selectedConversationId !== conversationId) {
                console.log('Message from another conversation:', message);
            } else {
                displayIncomingMessage(message);
            }
            handleAddMessagesToState(conversationId, { sender_id: "other", message_text: message });
            console.log(messages);
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, []);

    useEffect(() => {
        console.log('Friend count:', friendCount);
        console.log(Object.keys(messages).length);
        if (friendCount === Object.keys(messages).length) {
            Object.keys(messages).forEach((conversationId) => {
                socket.emit('join-conversation', Number(conversationId));
                console.log('Joined conversation:', conversationId);
            });
            allMessages = messages
            console.log(allMessages);
            setIsLoaded(true)
        }
    }, [messages]);

    const sendMessage = () => {
        displayOutgoingMessage(message);
        handleAddMessagesToState(selectedConversationId!, { sender_id: userData.email, message_text: message });
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
                throw new Error('error adding friend');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error posting sent message:', error);
        }
    }

    const displayIncomingMessage = (message: string) => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color:white; font-color: white; padding: 10px; margin: 10px; border: none; border-radius: 10px; align-self: flex-start;box-shadow: 0 0 10px 0px black; width: fit-content;';
            chatContent.appendChild(messageDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    };

    const displayOutgoingMessage = (message: string) => {
        if (message.trim() === '') return; // Don't send empty messages

        // Append message content directly to the chat content div
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color: #1F8AFF; padding: 10px; margin: 10px; border-radius: 10px; box-shadow: 0 0 10px 0px black; align-self: flex-end; width: fit-content;';
            chatContent.appendChild(messageDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    };

    const clearChatContent = () => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            chatContent.innerHTML = ''; // Remove all child elements
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
                <div style={chatBoxStyle.userContainer}>
                    <Image src={profilePlaceholder} roundedCircle style={chatBoxStyle.userIcon} />
                    <h3 style={chatBoxStyle.userName}>{selectedConversation?.name}</h3>
                </div>
                <div id="chatContent" style={chatBoxStyle.chatContent}>
                    {/* Content of the chat box */}
                </div>
                <div style={{ ...chatBoxStyle.inputContainer }}>
                    <div style={chatBoxStyle.inputBorder}>
                        <input style={chatBoxStyle.messageInput} placeholder="Search or start new chat"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown} />
                        {message ? (<img src={sendIcon} style={chatBoxStyle.sendIcon} onClick={sendMessage} alt="Send" />) : null}
                    </div>
                </div>
            </div>) : null}
        </>
    );
}

export default ChatBox;
