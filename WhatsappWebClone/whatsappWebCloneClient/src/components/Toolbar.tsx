import { Image } from "react-bootstrap";
import profilePlaceholder from "../assets/media/profilePlaceholder.png";
import menuIcon from "../assets/media/menuIcon.png";
import newChatIcon from "../assets/media/newChatIcon.png";
import searchIcon from "../assets/media/searchIcon.png";
import { toolbarStyle } from "../assets/homeStyles";
import { useState } from "react";
import ProfileModal from "./ProfileModal";

function Toolbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
    return (
        <div style={toolbarStyle.mainContainer}>
            <ProfileModal isOpen={isModalOpen} onClose={handleCloseModal} />
            <div style={toolbarStyle.userContainer}>
                <Image src={profilePlaceholder} roundedCircle style={toolbarStyle.profileIcon} />
                <div style={toolbarStyle.iconContainer}>
                    <Image src={newChatIcon} roundedCircle style={toolbarStyle.icon} />
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