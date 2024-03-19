import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAppContext } from './Contexts/appContext';

interface ToastMessageProps {
    message: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ message }) => {
    const { setToast } = useAppContext().toastContext;
    const notify = () => toast(message, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        onClose: () => {
            setToast("");
        }
    });

    useEffect(() => {
        notify();
    }, [message]);

    return (
        <ToastContainer />
    );
};

export default ToastMessage;
