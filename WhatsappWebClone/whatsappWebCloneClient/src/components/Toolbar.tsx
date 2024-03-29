import Image from "react-bootstrap/Image";
import profilePlaceholder from "../assets/media/profilePlaceholder.png";
import menuIcon from "../assets/media/menuIcon.png";
import addIcon from "../assets/media/addIcon.png";
import searchIcon from "../assets/media/searchIcon.png";
import { toolbarStyle } from "../assets/homeStyles";
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import FriendRequest from "./FriendRequest";
import { useAppContext, UserData } from "./Contexts/appContext";
import { useNavigate } from 'react-router-dom';

interface ToolbarProps {
    userData: UserData;
}

const Toolbar: React.FC<ToolbarProps> = ({ userData }) => {
    const navigate = useNavigate();
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [isFirendListOpen, setIsFriendListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addFriendText, setAddFriendText] = useState<string>('');
    const [friendRequests, setFriendRequests] = useState([]);
    const {search,setSearch} = useAppContext().searchConversationContext;
    const { setToast } = useAppContext().toastContext;
    const imageUrl = `${serverUrl}/${userData.url}`;
    const profileIcon = imageUrl || profilePlaceholder;

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsFriendListOpen(false);
    };

    const toggleFriendList = () => {
        setIsFriendListOpen(!isFirendListOpen);
        fetchFriendRequests();
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleAddFriend = async () => {
        if (addFriendText === '' || addFriendText === userData.email) return;
        try {
            const response = await fetch(`${serverUrl}/friendRequests`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    senderName: userData.name,
                    senderId: userData.email,
                    receiverId: addFriendText,
                    url: userData.url,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add friend');
            } else {
                setToast('Friend request sent');
            }
            return response.json();
        } catch (error) {
            if (error instanceof Error) {
                console.error(error);
                setToast(error.message);
            } else {
                console.error('Error', error);
            }
        };
        setAddFriendText('');
    };

    const fetchFriendRequests = async () => {
        try {
            const response = await fetch(`${serverUrl}/friendRequests/${userData.email}`);
            if (!response.ok) {
                throw new Error('Failed to fetch friend requests');
            }
            const data = await response.json();
            const sortedData = data.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            setFriendRequests(sortedData);
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error denying friend request:', error);
                setToast(error.message);
            }
        };
    };

    const handleLogout = async () => {
        try {
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                navigate('/');
                return;
            }
            const response = await fetch(`${serverUrl}/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            if (response.ok) {
                localStorage.removeItem('accessToken');
                navigate('/');
            } else {
                const data = await response.json();
                setToast(data.message || "Failed to logout");
            }
        } catch (error) {
            console.error("Error logging out:", error);
            setToast("Failed to logout");
        }
    };


    return (
        <div style={toolbarStyle.mainContainer}>
            <ProfileModal isOpen={isModalOpen} userData={userData} onClose={handleCloseModal} />
            <div style={toolbarStyle.userContainer}>
                <Image src={profileIcon} roundedCircle style={toolbarStyle.profileIcon} />
                <div style={toolbarStyle.iconContainer}>
                    <Image src={addIcon} roundedCircle style={toolbarStyle.addIcon} onClick={toggleFriendList} />
                    {isFirendListOpen && (
                        <ul style={toolbarStyle.friendList}>
                            <div style={toolbarStyle.firendListSearchContainer}>
                                <li style={toolbarStyle.friendListItem} > <input style={toolbarStyle.friendSearchInput} placeholder="Enter your friend's email" type="text" value={addFriendText} onChange={(e) => setAddFriendText(e.target.value)} /> </li>
                                <img src={addIcon} style={toolbarStyle.addIcon} onClick={handleAddFriend} alt="" />
                            </div>
                            <div style={toolbarStyle.friendListPendingContainer}>
                                {friendRequests.map((friendRequest: { sender_id: string; sender_name: string; request_id: number; url:string }) => (
                                    <li key={friendRequest.sender_id}>
                                        <FriendRequest email={friendRequest.sender_id} name={friendRequest.sender_name} requestId={friendRequest.request_id} url={friendRequest.url} />
                                    </li>
                                ))}
                            </div>
                        </ul>
                    )}
                    <Image src={menuIcon} roundedCircle style={toolbarStyle.icon} onClick={toggleMenu} />
                    {isOpen && (
                        <ul style={toolbarStyle.list}>
                            <li style={toolbarStyle.listItem} onClick={handleOpenModal}>Profile</li>
                            <li style={toolbarStyle.listItem} onClick={handleLogout}>Logout</li>
                        </ul>
                    )}
                </div>
            </div>
            <div style={toolbarStyle.spacerContainer}>
                <div style={toolbarStyle.searchbarContainer}>
                    <Image src={searchIcon} roundedCircle style={toolbarStyle.searchIcon} />
                    <input style={toolbarStyle.searchInput} value={search} onChange={(e) => setSearch(e.target.value)}  placeholder="Search for a chat"/>
                </div>
            </div>
        </div>
    );
}

export default Toolbar;