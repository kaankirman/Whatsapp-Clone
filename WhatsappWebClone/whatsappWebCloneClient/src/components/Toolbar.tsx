import { Image } from "react-bootstrap";
import profilePlaceholder from "../assets/media/profilePlaceholder.png";
import menuIcon from "../assets/media/menuIcon.png";
import addIcon from "../assets/media/addIcon.png";
import searchIcon from "../assets/media/searchIcon.png";
import { toolbarStyle } from "../assets/homeStyles";
import React, { useState } from "react";
import ProfileModal from "./ProfileModal";
import FriendRequest from "./FriendRequest";

interface ToolbarProps {
    userData: {
        name: string;
        status: string;
        email: string;
    };
}

const Toolbar: React.FC<ToolbarProps> = ({ userData }) => {
    const serverUrl = import.meta.env.VITE_BASE_URL;
    const [isOpen, setIsOpen] = useState(false);
    const [isFirendListOpen, setIsFriendListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addFriendText, setAddFriendText] = useState<string>('');
    const [friendRequests, setFriendRequests] = useState([]);
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
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add friend request');
            }
        } catch (error) {
            console.error('Error adding friend request:', error);
        }
    };

    const fetchFriendRequests = async () => {
        try {
            const response = await fetch(`${serverUrl}/friendRequests/${userData.email}`);
            console.log(userData.email);

            if (!response.ok) {
                throw new Error('Failed to fetch friend requests');
            }
            const data = await response.json();
            const sortedData = data.sort((a: { created_at: string | number | Date; }, b: { created_at: string | number | Date; }) => {
                return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            });
            setFriendRequests(sortedData);
        } catch (error) {
            console.error('Error fetching friend requests:', error);
        }
    };


    return (
        <div style={toolbarStyle.mainContainer}>
            <ProfileModal isOpen={isModalOpen} userData={userData} onClose={handleCloseModal} />
            <div style={toolbarStyle.userContainer}>
                <Image src={profilePlaceholder} roundedCircle style={toolbarStyle.profileIcon} />
                <div style={toolbarStyle.iconContainer}>
                    <Image src={addIcon} roundedCircle style={toolbarStyle.addIcon} onClick={toggleFriendList} />
                    {isFirendListOpen && (
                        <ul style={toolbarStyle.friendList}>
                            <div style={toolbarStyle.firendListSearchContainer}>
                                <li style={toolbarStyle.friendListItem} > <input style={toolbarStyle.friendSearchInput} placeholder="Enter your friend's email" type="text" onChange={(e) => setAddFriendText(e.target.value)} /> </li>
                                <img src={addIcon} style={toolbarStyle.addIcon} onClick={handleAddFriend} alt="" />
                            </div>
                            <div style={toolbarStyle.friendListPendingContainer}>
                                {friendRequests.map((friendRequest: { sender_id: string; sender_name: string; request_id: number; }) => (
                                    <li key={friendRequest.sender_id}>
                                        <FriendRequest email={friendRequest.sender_id} name={friendRequest.sender_name} requestId={friendRequest.request_id} />
                                    </li>
                                ))}
                            </div>

                        </ul>
                    )}
                    <Image src={menuIcon} roundedCircle style={toolbarStyle.icon} onClick={toggleMenu} />
                    {isOpen && (
                        <ul style={toolbarStyle.list}>
                            <li style={toolbarStyle.listItem} onClick={handleOpenModal}>Profile</li>
                            <li style={toolbarStyle.listItem} >Change chat background</li>
                            <li style={toolbarStyle.listItem} >Logout</li>
                        </ul>
                    )}
                </div>
            </div>
            <div style={toolbarStyle.spacerContainer}>
                <div style={toolbarStyle.searchbarContainer}>
                    <Image src={searchIcon} roundedCircle style={toolbarStyle.searchIcon} />
                    <input style={toolbarStyle.searchInput} placeholder="Search for a chat" />
                </div>
            </div>
        </div>
    );
}

export default Toolbar;