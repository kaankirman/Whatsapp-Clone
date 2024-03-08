import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"

function Home() {

  return (
      <div style={appStyle.mainContainer}>
        <div style={appStyle.subContainer}>
          <Toolbar />
          <ChatsContainer />
        </div>
        <ChatBox />
      </div>
  )
}

export default Home
