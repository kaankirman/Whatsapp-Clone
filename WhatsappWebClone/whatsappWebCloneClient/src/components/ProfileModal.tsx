import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'react-bootstrap/Image';
import profilePlaceholder from '../assets/media/bg.jpg';
import { profileModalContentStyle, profileModalStyle } from '../assets/homeStyles';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        name: string;
        status: string;
        email: string;
    };
}


const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose, userData }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    useEffect(() => { Modal.setAppElement('#root'); }, []);

    const handleSubmit = async () => {
        const formData = new FormData();
        if (name != userData.name) {
            formData.append('name', name);
            userData.name = name;
        }
        if (status != userData.status) {
            formData.append('status', status);
            userData.status = status;
        }
        try {
            const response: Response = await fetch(`${serverUrl}/users/${userData.email}`, {
                method: 'PATCH',
                body: formData,
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={profileModalStyle} contentLabel="Example Modal">
            <Image src={profilePlaceholder} roundedCircle style={profileModalContentStyle.image} />
            <div style={profileModalContentStyle.inputDiv}>
                <input placeholder='Name' type="text" value={userData.name} style={profileModalContentStyle.input} onChange={(e) => setName(e.target.value)} />
                <input placeholder='Status' type="text" value={userData.status} style={profileModalContentStyle.input} onChange={(e) => setStatus(e.target.value)} />
            </div>
            <div style={profileModalContentStyle.buttonDiv}>
                <button style={profileModalContentStyle.button} onClick={handleSubmit}>Save</button>
                <button style={profileModalContentStyle.cancelButton} onClick={onClose}>Cancel</button>
            </div>
        </Modal>
    );
};

export default ProfileModal;
