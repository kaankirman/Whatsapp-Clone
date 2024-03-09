import acceptIcon from "../assets/media/acceptIcon.png";
import denyIcon from "../assets/media/denyIcon.png";
import Image from "react-bootstrap/Image";
import bg from "../assets/media/bg.jpg";
import { friendRequestStyle } from "../assets/homeStyles";
interface FriendRequestProps {
    email: string;
    name: string;
}

function FriendRequest({ email, name }: FriendRequestProps) {
    return (
        <div style={friendRequestStyle.mainContainer}>
            <Image src={bg} roundedCircle style={friendRequestStyle.image} />
            <div style={friendRequestStyle.textContainer}>
                <h3 style={friendRequestStyle.text}>{name}</h3>
                <h4 style={friendRequestStyle.text}>{email}</h4>
            </div>
            <div style={friendRequestStyle.buttonContainer}>
                <img style={friendRequestStyle.button} src={acceptIcon} alt="" />
                <img style={friendRequestStyle.button} src={denyIcon} alt="" />
            </div>
        </div>
    )
}

export default FriendRequest;