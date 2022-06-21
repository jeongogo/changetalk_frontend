import { BrowserRouter, Routes, Route } from "react-router-dom";
import io from "socket.io-client";
import useStore from './modules/store';
import ChatListPage from './pages/chat/ChatList.page';
import ChatPage from './pages/chat/Chat.page';
import UserListPage from './pages/auth/UserList.page';
import FriendListPage from './pages/friend/FriendList.page';
import LoginPage from './pages/auth/Login.page';
import RegisterPage from './pages/auth/Register.page';
import SearchPage from './pages/search/Search.page';
import SettingPage from './pages/setting/Setting.page';
import ProfilePage from './pages/setting/Profile.page';

const socket = io.connect("http://localhost:4000");

function App() {
  const currentUser = useStore((state) => state.user);

  return (
    <BrowserRouter>
      {currentUser?.username
        ?
          <Routes>
            <Route path="/" element={<ChatListPage socket={socket} />} />
            <Route path="/chat/:id" element={<ChatPage socket={socket} />} />
            <Route path="/users" element={<UserListPage />} />
            <Route path="/friends" element={<FriendListPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        :
          <Routes>
            <Route path="/*" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
