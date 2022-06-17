import React from 'react';
import styled from 'styled-components';

const Avatar = ({ user, isChat, messages }) => {
  return (
    <Container>
      <div className='avatar'>
        <img src="../avatar_default.jpg" alt="" />
      </div>
      <div className="info">
        <div className='name'>{user.username}</div>
        {isChat
          ? <div className='message'>{messages.slice(-1)[0].content}</div>
          : <div className='state-message'>{user.stateMessage}</div>
        }
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  .avatar {
    position: relative;
    width: 3rem;
    height: 3rem;
    margin-right: 0.7rem;
    border-radius: 50%;
    overflow: hidden;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .info {
    .name {
      width: 100%;
      font-weight: 500;
    }
    .message {
      font-weight: 300;
      color: #999;
    }
    .state-message {
      color: #999;
    }
  }
`;

export default Avatar;