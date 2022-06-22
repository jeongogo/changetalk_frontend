import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useStore from '../../modules/store';
import UserList from '../../components/auth/UserList';

const UserListContainer = () => {
  const currentUser = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const [users, setUsers] = useState([]);

  const handleAddFriend = async (id) => {
    const { data } = await axios.post(
      `/api/auth/friends/${currentUser._id}`,
      { id: id },
      {
        headers: { authorization: 'Bearer ' + currentUser.accessToken }
      }
    );
    const friends = currentUser.friends.concat(id);
    setUser({ ...currentUser, friends: friends });
  }

  useEffect(() => {
    (async function() {
      const { data } = await axios.get('/api/auth/users');
      const filterUsers = data.filter((user) => user._id !== currentUser._id && !currentUser.friends.includes(user._id));
      setUsers(filterUsers);
    })();
  }, [currentUser]);

  return (
    <UserList currentUser={currentUser} users={users} handleAddFriend={handleAddFriend} />
  )
}

export default UserListContainer