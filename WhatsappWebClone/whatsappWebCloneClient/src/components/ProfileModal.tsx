import React, { useState } from 'react';
import Modal from 'react-modal';
import Image from 'react-bootstrap/Image';
import profilePlaceholder from '../assets/media/bg.jpg';
import { profileModalContentStyle, profileModalStyle } from '../assets/homeStyles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');

    const handleSubmit = () => {
        // Add your logic to handle the form submission
        // For example, you can send the data to a server or perform local actions
        console.log('Name:', name);
        console.log('Status:', status);

        // Close the modal after handling the submission
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={profileModalStyle} contentLabel="Example Modal">
            <Image src={profilePlaceholder} roundedCircle style={profileModalContentStyle.image} />
            <div style={profileModalContentStyle.inputDiv}>
                <input placeholder='Name' type="text" value={name} style={profileModalContentStyle.input} onChange={(e) => setName(e.target.value)} />
                <input placeholder='Status' type="text" value={status} style={profileModalContentStyle.input} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <div style={profileModalContentStyle.buttonDiv}>
                <button style={profileModalContentStyle.button} onClick={handleSubmit}>Save</button>
                <button style={profileModalContentStyle.cancelButton} onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ProfileModal;
