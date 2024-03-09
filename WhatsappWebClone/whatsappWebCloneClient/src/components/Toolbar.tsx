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
    const [isOpen, setIsOpen] = useState(false);
    const [isFirendListOpen, setIsFriendListOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [addFriendText, setAddFriendText] = useState<string>('');

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        setIsFriendListOpen(false);
    };
    const toggleFriendList = () => {
        setIsFriendListOpen(!isFirendListOpen);
        setIsOpen(false);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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
                                <img src={addIcon} style={toolbarStyle.addIcon} alt="" />
                            </div>
                            {/* insert friend request template */}
                            <div style={toolbarStyle.friendListPendingContainer}>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>
                                <li ><FriendRequest email={"kaankirman@gmail.com"} name={"Kaan Kırman"} /></li>

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