import acceptIcon from "../assets/media/acceptIcon.png";
import denyIcon from "../assets/media/denyIcon.png";
import Image from "react-bootstrap/Image";
import bg from "../assets/media/bg.jpg";
import { friendRequestStyle } from "../assets/homeStyles";
import { useState } from "react";
import { useAppContext } from "./Contexts/appContext";
interface FriendRequestProps {
    email: string;
    name: string;
    requestId: number;
    url: string;
}

function FriendRequest({ email, name, requestId, url }: FriendRequestProps) {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [isRequestAccepted, setIsRequestAccepted] = useState(true);
    const { setToast } = useAppContext().toastContext;
    const requestImage = `${serverUrl}/${url}`


    const handleRequest = async () => {
        try {
            const response = await fetch(`${serverUrl}/friendRequests/${requestId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('error deleting friend request');
            }
            const data = await response.json();
            if (isRequestAccepted) {
                handleAddFriend(data.sender_id, data.receiver_id);
                window.location.reload();
                setIsRequestAccepted(false);
            }
            clearFriendRequest();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
    };

    const handleAddFriend = async (senderId: string, receiverId: string) => {
        try {
            const response = await fetch(`${serverUrl}/friends`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderId: senderId,
                    receiverId: receiverId,
                }),
            });

            if (!response.ok) {
                throw new Error('error adding friend');
            }
            const data = await response.json();
            console.log(data);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
    };

    const clearFriendRequest = () => {
        const chatContent = document.getElementById('friendRequest');
        if (chatContent) {
            chatContent.innerHTML = '';
        }
    };

    return (
        <div id="friendRequest">
            <div style={friendRequestStyle.mainContainer}>
                <Image src={requestImage} roundedCircle style={friendRequestStyle.image} />
                <div style={friendRequestStyle.textContainer}>
                    <h3 style={friendRequestStyle.text}>{name}</h3>
                    <h4 style={friendRequestStyle.emailText}>{email}</h4>
                </div>
                <div style={friendRequestStyle.buttonContainer}>
                    <img
                        style={friendRequestStyle.button}
                        src={acceptIcon}
                        onClick={() => {
                            setIsRequestAccepted(true);
                            handleRequest();
                        }}
                        alt="Accept"
                    />
                    <img
                        style={friendRequestStyle.button}
                        src={denyIcon}
                        onClick={() => {
                            setIsRequestAccepted(false);
                            handleRequest();
                        }}
                        alt="Deny"
                    />
                </div>
            </div>
        </div>
    )
}

export default FriendRequest;