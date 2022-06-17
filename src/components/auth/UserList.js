import React from 'react';
import styled from 'styled-components';

const UserList = ({ users, handleAddFriend }) => {
  const handleSubmit = (id) => {
    handleAddFriend(id);
  }

  return (
    <Container>
      <ul>
        {users && users.map((user) => (
          <li key={user._id}>
            <div>{user.username}</div>
            <button type='button' onClick={() => handleSubmit(user._id)}>친구 추가</button>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 0;
    }
  }
`;

export default UserList