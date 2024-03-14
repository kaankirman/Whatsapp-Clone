import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"
import { useLocation } from "react-router-dom"
import { useState } from "react"

export interface SelectedConversation {
  name: string;
  conversationId: number;
}

function Home() {

  const location = useLocation()
  const userData = location.state.data
  const [selectedConversation, setSelectedConversation] = useState<SelectedConversation | null>(null);

  const handleChatSelect = (selectedConversation: SelectedConversation) => {
    setSelectedConversation(selectedConversation); // Set the selected conversation ID
    console.log('Selected friend:', selectedConversation);
  };


  return (
    <div style={appStyle.mainContainer}>
      <div style={appStyle.subContainer}>
        <Toolbar userData={userData} />
        <ChatsContainer userData={userData} selectedConversation={selectedConversation} handleChatSelect={handleChatSelect} />
      </div>
      <ChatBox selectedConversation={selectedConversation} />
    </div>
  )
}

export default Home
