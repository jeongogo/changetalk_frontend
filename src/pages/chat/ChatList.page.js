import React from 'react';
import Nav from '../../components/common/Nav';
import ChatListContainer from '../../containers/chat/ChatList.container';

const ChatListPage = ({ socket }) => {
  return (
    <>
      <Nav />
      <ChatListContainer socket={socket} />
    </>
  );
}

export default ChatListPage;