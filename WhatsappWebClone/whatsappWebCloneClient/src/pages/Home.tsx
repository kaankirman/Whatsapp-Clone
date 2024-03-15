import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"
import { useLocation } from "react-router-dom"
import { SelectedConversationProvider } from "../components/SelectedConversationContext";

function Home() {
  const location = useLocation()
  const userData = location.state.data

  return (
    <SelectedConversationProvider >
      <div style={appStyle.mainContainer}>
        <div style={appStyle.subContainer}>
          <Toolbar userData={userData} />
          <ChatsContainer userData={userData} />
        </div>
        <ChatBox />
      </div>
    </SelectedConversationProvider>
  )
}

export default Home
