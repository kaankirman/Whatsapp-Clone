import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"
import { useLocation } from "react-router-dom"
import { SelectedConversationProvider } from "../components/SelectedConversationContext";
import { MessageContext, MessageProvider } from "../components/MessageContext"

function Home() {
  const location = useLocation()
  const userData = location.state.data

  return (
    <SelectedConversationProvider >
      <MessageProvider>
        <div style={appStyle.mainContainer}>
          <div style={appStyle.subContainer}>
            <Toolbar userData={userData} />
            <ChatsContainer userData={userData} />
          </div>
          <ChatBox userData={userData} />
        </div>
      </MessageProvider>
    </SelectedConversationProvider>
  )
}

export default Home
