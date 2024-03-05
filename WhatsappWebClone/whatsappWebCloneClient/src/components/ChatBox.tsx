import profilePlaceholder from '../assets/media/profilePlaceholder.png';
import { Image } from 'react-bootstrap';
import { chatBoxStyle } from '../assets/appStyles';

function ChatBox() {
    return (
        <div style={chatBoxStyle.mainContainer}>
            <div style={chatBoxStyle.userContainer}>
                <Image src={profilePlaceholder} roundedCircle style={chatBoxStyle.userIcon} />
                <h3 style={chatBoxStyle.userName}>Jane Doe</h3>
            </div>
            <div style={chatBoxStyle.chatContent}>
                {/* Content of the chat box */}
            </div>
            <div style={{...chatBoxStyle.inputContainer}}>
                <input style={chatBoxStyle.messageInput} placeholder="Search or start new chat" />
            </div>        
        </div>
    );
}

export default ChatBox;