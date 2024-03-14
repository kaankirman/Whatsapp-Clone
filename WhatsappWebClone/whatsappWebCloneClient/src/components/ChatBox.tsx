import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { Image } from 'react-bootstrap';
import { chatBoxStyle } from '../assets/homeStyles';
import { useState } from 'react';
import sendIcon from '../assets/media/sendIcon.png';
import { SelectedConversation } from '../pages/Home';

interface ChatBoxProps {
    selectedConversation: SelectedConversation | null;
}

const ChatBox: React.FC<ChatBoxProps> = ({selectedConversation}) => {
    const [message, setMessage] = useState('');
    function sendMessage() {
        // Send the message to the server
    }
    return (
        <div style={chatBoxStyle.mainContainer}>
            <div style={chatBoxStyle.userContainer}>
                <Image src={profilePlaceholder} roundedCircle style={chatBoxStyle.userIcon} />
                <h3 style={chatBoxStyle.userName}>{selectedConversation?.name}</h3>
            </div>
            <div style={chatBoxStyle.chatContent}>
                {/* Content of the chat box */}
            </div>
            <div style={{ ...chatBoxStyle.inputContainer }}>
                <div style={chatBoxStyle.inputBorder}>
                    <input style={chatBoxStyle.messageInput} placeholder="Search or start new chat"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)} />
                    {message ? (<img src={sendIcon} style={chatBoxStyle.sendIcon} onClick={sendMessage} alt="" />) : null}
                </div>
            </div>
        </div>
    );
}

export default ChatBox;