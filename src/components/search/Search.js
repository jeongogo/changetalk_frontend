import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Avatar from '../common/Avatar';
import Alarm from '../../components/common/Alarm';
import { FiSearch, FiUserPlus } from "react-icons/fi";

const Search = ({ currentUser, users, handleSearch, handleAddFriend, successMessage, openAlarm, setOpenAlarm }) => {
  const [text, setText] = useState('');
  const textRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(text);
    setText('');
  }

  const handleAdd = (id) => {
    handleAddFriend(id);
  }

  return (
    <Container>
      <div className='input-box'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
            ref={textRef}
            onKeyPress={(e) => {
              e.key === "Enter" && handleSubmit(e);
            }}
            placeholder='이름으로 검색'
          />
          <button type='submit'>
            <FiSearch />
          </button>
        </form>

      </div>
      <div className="user-list">
        <ul>
          {users && users.map((user) => (
            <li key={user._id}>
              <Avatar user={user} />
              <button
                type='button'
                className='add-friend'
                disabled={!currentUser.friends.includes(user._id) && currentUser._id !== user._id ? false : true}
                onClick={() => handleAdd(user._id)}
              >
                <FiUserPlus />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {openAlarm && <Alarm text={successMessage} handleClose={setOpenAlarm} />}
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  .input-box {
    form {
      position: relative;
      input[type='text'] {
        width: 100%;
        font-size: 0.9rem;
        padding-left: 1rem;
        padding-right: 3rem;
        border-radius: 2rem;
      }
      button {
        position: absolute;
        top: 0.6rem;
        right: 1rem;
        padding: 0;
        margin: 0;
        font-size: 1.2rem;
      }
    }
  }
  .user-list {
    margin-top: 1rem;
    ul {
      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.7rem 0;
        .add-friend {
          font-size: 1.2rem;
        }
      }
    }
  }
`;

export default Search;