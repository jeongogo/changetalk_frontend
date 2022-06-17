import React from 'react';
import Nav from '../../components/common/Nav';
import UserListContainer from '../../containers/auth/UserList.container';

const UserListPage = () => {
  return (
    <>
      <Nav />
      <UserListContainer />
    </>
  );
}

export default UserListPage;