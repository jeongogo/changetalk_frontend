import React, { useState } from 'react';
import axios from 'axios';
import useStore from '../../modules/store';
import Header from '../../components/common/Header';
import Search from '../../components/search/Search';

const SearchContainer = () => {
  const currentUser = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [users, setUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState();
  const [openAlarm, setOpenAlarm] = useState(false);

  const handleSearch = async (text) => {
    const { data } = await axios.get(`/api/auth/search/${text}`, {
      text,
    });
    setUsers(data);
  }

  const handleAddFriend = async (id) => {
    try {
      const { data } = await axios.post(
        `/api/auth/friends/${currentUser._id}`,
        { id: id },
        { headers: { authorization: 'Bearer ' + currentUser.accessToken }}
      );
      setUser({ ...currentUser, friends: currentUser.friends.concat(id) });
      setOpenAlarm(true);
      setSuccessMessage('친구 추가 완료되었습니다.');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header title='검색' />
      <Search
        currentUser={currentUser}
        users={users}
        handleSearch={handleSearch}
        handleAddFriend={handleAddFriend}
        successMessage={successMessage}
        openAlarm={openAlarm}
        setOpenAlarm={setOpenAlarm}
      />
    </>
  );
}

export default SearchContainer;