import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Toolbar from '../components/Toolbar';
import ChatsContainer from '../components/ChatsContainer';
import ChatBox from '../components/ChatBox';
import { appStyle } from '../assets/homeStyles';
import { AppContextProvider, useAppContext, UserData } from '../components/Contexts/appContext';
import ToastMessage from '../components/ToastContainer';

function HomeLayoutContent({ userData }: { userData: UserData }) {
  const serverUrl = import.meta.env.VITE_BASE_URL;
  const [friendCount, setFriendCount] = useState(0);
  const { setName, setStatus, setUrl } = useAppContext().userDataContext;
  const { toast, setToast } = useAppContext().toastContext;
  const { selectedConversation, setSelectedConversation } = useAppContext().selectedConversationContext;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${serverUrl}/users/${userData.email}`);
        if (!response.ok) {
          throw new Error('error fetching user data');
        }
        const data = await response.json();
        setName(data.name);
        setStatus(data.status);
        if (!data.url) setUrl("uploads\\profilePlaceholder.png");
        else setUrl(data.url);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setToast('Error fetching user data');
      }
    };

    fetchUserData();
  }, [serverUrl, userData.email, setName, setStatus, setUrl, userData]);

  if (!userData.name || !userData.status) {
    return null;
  }

  return (
    <div style={appStyle.mainContainer}>
      {toast && <ToastMessage message={toast} />}
      <div style={{ ...appStyle.subContainer, ...(selectedConversation ? { display: 'none', width: "0%" } : {}) }}>
        <Toolbar userData={userData} />
        <ChatsContainer userData={userData} setFriendCount={setFriendCount} />
      </div>
      <ChatBox userData={userData} friendCount={friendCount} />
    </div>
  );
}

function HomeLayout() {
  const location = useLocation();
  const { setEmail, userData } = useAppContext().userDataContext;

  useEffect(() => {
    setEmail(location.state.data.email);
  }, [location.state.data.email, setEmail]);

  if (!userData.email) {
    return null;
  }

  return <HomeLayoutContent userData={userData} />;
}

const Home = () => (
  <AppContextProvider>
    <HomeLayout />
  </AppContextProvider>
);

export default Home;
