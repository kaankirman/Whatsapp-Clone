import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { useState, useEffect } from 'react';
import { Image } from 'react-bootstrap';
import { chatBoxStyle } from '../assets/homeStyles';
import { io } from 'socket.io-client';
import sendIcon from '../assets/media/sendIcon.png';
import { useSelectedConversation } from '../components/SelectedConversationContext';

const serverUrl = import.meta.env.VITE_BASE_URL;
const socketUrl = import.meta.env.VITE_SOCKET_URL;
const socket = io(socketUrl);
let selectedConversationId: number | null;

const ChatBox: React.FC<{ userData: any }> = ({ userData }) => {
    const [message, setMessage] = useState('');
    const { selectedConversation } = useSelectedConversation();

    useEffect(() => {
        selectedConversationId = selectedConversation?.conversationId ?? null;
        socket.emit('join-conversation', selectedConversation?.conversationId);
    }, [selectedConversation]);

    useEffect(() => {
        const handleReceiveMessage = (message: string, conversationId: any) => {
            if (selectedConversationId === conversationId) {
                displayIncomingMessage(message);
            }
            else {
                console.log('Message from another conversation:', message);
            }
        };
        socket.on('receive-message', handleReceiveMessage);
        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, []);

    const displayIncomingMessage = (message: string) => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color:white; font-color: white; padding: 10px; margin: 10px; border: none; border-radius: 10px; align-self: flex-start;box-shadow: 0 0 10px 0px black; width: fit-content;';
            chatContent.appendChild(messageDiv);
        }
    };

    const displayOutgoingMessage = () => {
        if (message.trim() === '') return; // Don't send empty messages

        // Append message content directly to the chat content div
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color: #1F8AFF; padding: 10px; margin: 10px; border-radius: 10px; box-shadow: 0 0 10px 0px black; align-self: flex-end; width: fit-content;';
            chatContent.appendChild(messageDiv);
        }
    };

    const sendMessage = () => {
        displayOutgoingMessage();
        socket.emit('send-message', message, selectedConversationId);
        handleSendMessage();
        setMessage(''); // Clear the input field
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
            console.error('Error denying friend request:', error);
        }
    }

    return (
        <div style={chatBoxStyle.mainContainer}>
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
                        onChange={(e) => setMessage(e.target.value)} />
                    {message ? (<img src={sendIcon} style={chatBoxStyle.sendIcon} onClick={sendMessage} alt="Send" />) : null}
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
