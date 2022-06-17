import React from 'react';
import ChatContainer from '../../containers/chat/Chat.container';

const ChatPage = ({ socket }) => {
  return (
    <>
      <ChatContainer socket={socket} />
    </>
  );
}

export default ChatPage;