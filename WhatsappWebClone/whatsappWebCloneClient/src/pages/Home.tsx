import Toolbar from "../components/Toolbar"
import ChatsContainer from "../components/ChatsContainer"
import ChatBox from "../components/ChatBox"
import { appStyle } from "../assets/homeStyles"
import { useLocation } from "react-router-dom"

function Home() {

  const location = useLocation()
  const userData = location.state.data

  return (
    <div style={appStyle.mainContainer}>
      <div style={appStyle.subContainer}>
        <Toolbar userData={userData} />
        <ChatsContainer />
      </div>
      <ChatBox />
    </div>
  )
}

export default Home
