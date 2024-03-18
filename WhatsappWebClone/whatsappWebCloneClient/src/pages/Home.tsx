import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar';
import ChatsContainer from '../components/ChatsContainer';
import ChatBox from '../components/ChatBox';
import { appStyle } from '../assets/homeStyles';
import { SelectedConversationProvider } from '../components/Contexts/SelectedConversationContext';
import { MessageProvider } from '../components/Contexts/MessageContext';

function HomeLayout() {
  const location = useLocation();
  const userData = location.state.data;
  const [friendCount, setFriendCount] = useState(0);

  

  return (
    <div style={appStyle.mainContainer}>
      <div style={appStyle.subContainer}>
        <Toolbar userData={userData} />
        <ChatsContainer userData={userData} setFriendCount={setFriendCount} />
      </div>
      <ChatBox userData={userData} friendCount={friendCount} />
    </div>
  );
}

const Home = () => (
  <SelectedConversationProvider>
    <MessageProvider>
      <HomeLayout />
    </MessageProvider>
  </SelectedConversationProvider>
);

export default Home;
