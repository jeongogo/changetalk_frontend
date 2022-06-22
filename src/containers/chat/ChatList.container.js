import React from 'react';
import axios from 'axios';
import { useQuery } from "react-query";
import useStore from '../../modules/store';
import Header from '../../components/common/Header';
import ChatList from '../../components/chat/ChatList';
import Loader from '../../components/common/Loader';

const ChatListContainer = () => {
  const currentUser = useStore((state) => state.user);

  const getChatList = async () => {
    const { data } = await axios.get(`/api/chat/${currentUser._id}`, {
      headers: { authorization: 'Bearer ' + currentUser.accessToken }
    });
    return data;
  }

  const { isLoading, data, error } = useQuery("chatListQuery", getChatList, {
    refetchInterval: 1000,
    refetchIntervalInBackground: true
  });

  if (isLoading) {
    return <Loader position='full' />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Header title='대화' />
      <ChatList data={data.data} currentUser={currentUser} isLoading={isLoading} />
    </div>
  );
}

export default ChatListContainer;