import { useState, useEffect } from 'react';
import Image from 'react-bootstrap/Image';
import { chatBoxStyle } from '../assets/homeStyles';
import { io } from 'socket.io-client';
import sendIcon from '../assets/media/sendIcon.png';
import { useAppContext } from './Contexts/appContext';
import backIcon from '../assets/media/backIcon.png';

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
    const [currentConversation, setCurrentConversation] = useState(selectedConversation);

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
                const { message_text } = messageObj;
                if (messageObj.sender_id === userData.email) {
                    displayOutgoingMessage(message_text);
                }
                else {
                    displayIncomingMessage(message_text);
                }
            });
            setCurrentConversation(selectedConversation);
        }
        console.log('selectedConversation', selectedConversation);
    }, [selectedConversation]);

    useEffect(() => {
        const handleReceiveMessage = (message: string, conversationId: number) => {
            if (selectedConversationId === conversationId) {
                displayIncomingMessage(message);
            }
            handleAddMessagesToState(conversationId, { sender_id: "other", message_text: message, send_at: new Date().toISOString() });
        };

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

    const sendMessage = () => {
        if (message.trim() === '') return;
        displayOutgoingMessage(message);
        handleAddMessagesToState(selectedConversationId!, { sender_id: userData.email, message_text: message, send_at: new Date().toISOString() });
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

    const displayIncomingMessage = (message: string) => {
        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color:#2b2b2b; color: white; padding: 10px; margin: 10px; border: none; border-radius:0 10px 10px 10px; align-self: flex-start;box-shadow: 0 0 10px 0px black; max-width: 400px;';
            chatContent.appendChild(messageDiv);
            chatContent.scrollTop = chatContent.scrollHeight;
        }
    };


    const displayOutgoingMessage = (message: string) => {
        if (message.trim() === '') return;

        const chatContent = document.getElementById('chatContent');
        if (chatContent) {
            const messageDiv = document.createElement('div');
            messageDiv.textContent = message;
            messageDiv.style.cssText = 'background-color: #636363; color:white; padding: 10px; margin: 10px; border-radius:10px 0 10px 10px; box-shadow: 0 0 10px 0px black; align-self: flex-end; width: fit-content; word-wrap: break-word; max-width: 400px;';
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
                        <img src={backIcon} style={chatBoxStyle.backIcon} alt="Back" onClick={() => setSelectedConversation(null)} />
                        <input style={chatBoxStyle.messageInput} placeholder="Search or start new chat"
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
