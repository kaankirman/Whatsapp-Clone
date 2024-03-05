import { Image } from 'react-bootstrap';
import { accentColor, frameColor, chatStyle } from '../assets/appStyles';

interface ChatProps {
    image: string;
    name: string;
    message: string;
    time: string;
    onSelect: () => void;
    isSelected: boolean;
}

function Chat({ image, name, message, time, onSelect, isSelected }: ChatProps) {
    return (
        <div onClick={onSelect} style={{ ...chatStyle.mainContainer, background: isSelected ? accentColor : frameColor }}>
            <div style={chatStyle.userContainer}>
                <Image src={image} roundedCircle style={chatStyle.userImage} />
                <div style={chatStyle.userTextContainer}>
                    <h3 style={chatStyle.userText}>{name}</h3>
                    <p style={chatStyle.userText}>{message}</p>
                </div>
            </div>
            <p style={chatStyle.userText}>{time}</p>
        </div>
    );
}

export default Chat;
