import React from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '../common/Avatar';
import styled from 'styled-components';

const ChatList = ({ data, currentUser }) => {
  const navigate = useNavigate();

  const handleChat = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <Container>
      <ul>
      {data && data.map((item) => (
        <li key={item._id}>
        {item.users.map((i) => {
          if (i._id !== currentUser._id) {
            return (
              <div key={i._id}  onDoubleClick={() => handleChat(i._id)}>
                <Avatar user={i} isChat={true} messages={item.messages} />
              </div>
            )
          }
        })}
        </li>
      ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  user-select: none;
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

export default ChatList;