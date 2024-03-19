import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Image from 'react-bootstrap/Image';
import { profileModalContentStyle, profileModalStyle } from '../assets/homeStyles';
import { useAppContext } from './Contexts/appContext';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    userData: {
        name: string;
        status: string;
        email: string;
        url: string;
    };
}

const ProfileModal: React.FC<ModalProps> = ({ isOpen, onClose, userData }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [name, setName] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);
    const [imageSrc, setImageSrc] = useState<string>(''); // Provide an initial value for the useState<string> hook
    const { setUrl } = useAppContext().userDataContext;
    const { setToast } = useAppContext().toastContext;

    if (userData.url) {
        useEffect(() => {
            setImageSrc(`${serverUrl}/${userData.url}`);
        }, []);
    }

    useEffect(() => { Modal.setAppElement('#root'); }, []);

    const handleSubmit = async () => {
        const formData = new FormData();
        if (name !== userData.name) {
            formData.append('name', name);
            userData.name = name;
        }
        if (status !== userData.status) {
            formData.append('status', status);
            userData.status = status;
        }
        if (image) {
            formData.append('image', image);
        }
        try {
            const response: Response = await fetch(`${serverUrl}/users/${userData.email}`, {
                method: 'PATCH',
                body: formData,
            });
            const data = await response.json();
            if (data.url) {
                setUrl(data.url);
            }
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
        onClose();
    };

    useEffect(() => {
        setName(userData.name);
        setStatus(userData.status);
    }, [userData]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const selectedImage = event.target.files[0];
            setImage(selectedImage);
            setImageSrc(URL.createObjectURL(selectedImage));
        }
    };

    const handleProfileClick = () => {
        document.getElementById('imageUpload')?.click();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={profileModalStyle} contentLabel="Profile Modal">
            <Image src={imageSrc} roundedCircle style={profileModalContentStyle.image} onClick={handleProfileClick} />
            <input type="file" id="imageUpload" style={{ display: 'none' }} onChange={handleImageChange} />
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
