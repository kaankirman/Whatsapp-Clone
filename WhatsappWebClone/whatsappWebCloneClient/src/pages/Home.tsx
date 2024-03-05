import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"

function Home() {

  return (
    <div>
      <div style={appStyle.mainContainer}>
        <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
          <Toolbar />
          <ChatsContainer />
        </div>
        <ChatBox />
      </div>
    </div>
  )
}

export default Home
