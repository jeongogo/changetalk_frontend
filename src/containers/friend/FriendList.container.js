import React from 'react';
import { useQuery } from "react-query";
import axios from 'axios';
import useStore from '../../modules/store';
import FriendList from '../../components/friend/FriendList';
import Header from '../../components/common/Header';
import Loader from '../../components/common/Loader';

const FriendListContainer = () => {
  const currentUser = useStore((state) => state.user);

  const getFriends = async () => {
    const { data } = await axios.get(`/api/auth/friends/${currentUser._id}`);
    return data;
  }

  const { isLoading, data, error } = useQuery("friendsQuery", getFriends);

  if (isLoading) {
    return <Loader position='full' />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header title='친구' />
      <FriendList friends={data} />
    </>
  );
}

export default FriendListContainer;