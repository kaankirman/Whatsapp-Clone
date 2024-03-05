import { Image } from "react-bootstrap";
import profilePlaceholder from "../assets/media/profilePlaceholder.png";
import menuIcon from "../assets/media/menuIcon.png";
import newChatIcon from "../assets/media/newChatIcon.png";
import searchIcon from "../assets/media/searchIcon.png";
import { toolbarStyle } from "../assets/appStyles";

function Toolbar() {
    return (
        <div style={toolbarStyle.mainContainer}>
            <div style={toolbarStyle.userContainer}>
                <Image src={profilePlaceholder} roundedCircle style={toolbarStyle.profileIcon} />
                <div style={toolbarStyle.iconContainer}>
                    <Image src={newChatIcon} roundedCircle style={toolbarStyle.icon} />
                    <Image src={menuIcon} roundedCircle style={toolbarStyle.icon} />
                </div>
            </div>
            <div style={toolbarStyle.spacerContainer}>
                <div style={toolbarStyle.searchbarContainer}>
                    <Image src={searchIcon} roundedCircle style={toolbarStyle.searchIcon} />
                    <input style={toolbarStyle.searchInput} placeholder="Search or start new chat" />
                </div>
            </div>
        </div>
    );
}

export default Toolbar;