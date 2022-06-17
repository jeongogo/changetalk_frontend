import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../modules/store';
import Header from '../../components/common/Header';
import Search from '../../components/search/Search';

const SearchContainer = () => {
  const currentUser = useStore((state) => state.user);
  const [users, setUsers] = useState([]);

  const handleSearch = async (text) => {
    const { data } = await axios.get(`/api/auth/search/${text}`, {
      text,
    });
    setUsers(data);
  }

  const handleAddFriend = async (id) => {
    const { data } = await axios.post(`/api/auth/friends/${currentUser._id}`, { id: id });
    alert('친구 추가 완료되었습니다.');
  }

  return (
    <>
      <Header title='검색' />
      <Search currentUser={currentUser} users={users} handleSearch={handleSearch} handleAddFriend={handleAddFriend} />
    </>
  );
}

export default SearchContainer;