import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useStore from "../../modules/store";
import styled from 'styled-components';

const Setting = () => {
  const navigate = useNavigate();
  const currentUser = useStore((state) => state.user);
  const removeUser = useStore((state) => state.removeUser);

  const handleLogout = () => {
    removeUser();
    navigate('/login');
  };

  return (
    <Container>
      <ul>
        <li>
          <div className="user">
            <div className='avatar'>
              {currentUser.avatarImage
                ?
                <img src={currentUser.avatarImage} alt="" />
                :
                <img src="../avatar_default.jpg" alt="" />
              }
            </div>
            <div className="info">
              <div className="name">
                {currentUser.username}
              </div>
              <div className="state-message">
                {currentUser.stateMessage}
              </div>
            </div>
          </div>
          <Link to={`/profile/${currentUser._id}`}>편집하기</Link>
        </li>
        <li>
          <div className="logout">
            <button type='button' onClick={handleLogout}>로그아웃</button>
          </div>
        </li>
      </ul>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  user-select: none;
  ul {
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.7rem 0;
      a, button {
        padding: 5px 1rem;
        background-color: #fafafa;
        border: 1px solid #eee;
        border-radius: 3px;
      }
      .user {
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

          }
          .state-message {
            color: #999;
          }
        }
      }
      .logout {
        margin-left: auto;
      }
    }
  }
`;

export default Setting;