import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '../common/Avatar';

const FriendList = ({ friends }) => {
  const navigate = useNavigate();

  const handleChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <ul>
        {friends && (
          friends.map((friend) => (
            <li key={friend._id} onDoubleClick={() => handleChat(friend._id)}>
              <Avatar user={friend} />
            </li>
          ))
        )}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  ul {
    li {
      padding: 0.7rem 1rem;
      user-select: none;
      &:hover {
        background-color: #fafafa;
      }
    }
  }
`;

export default FriendList;