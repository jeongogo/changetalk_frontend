import React, { useState } from 'react';
import styled from 'styled-components';

const Profile = ({ currentUser, handleProfileSave }) => {
  const [values, setValues] = useState({
    userid: currentUser.userid,
    username: currentUser.username,
    stateMessage: currentUser.stateMessage || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleProfileSave(values);
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-box">
          <div className='wrap'>
            <label>아이디</label>
            <input
              type="text"
              value={values.userid}
              disabled
            />
          </div>
          <div className='wrap'>
            <label>이름</label>
            <input
              type="text"
              name='username'
              value={values.username}
              disabled
            />
          </div>
          <div className='wrap'>
            <label>상태메세지</label>
            <input
              type="text"
              name='stateMessage'
              value={values.stateMessage}
              onChange={(e) => handleChange(e)}
              autoComplete='off'
            />
          </div>
        </div>
        <div className='btn'>
          <button type='submit'>저장</button>
        </div>
      </form>
    </Container>
  );
}

const Container = styled.div`
  padding: 0.5rem 1rem;
  form {
    .input-box {
      .wrap {
        display: flex;
        align-items: center;
        margin-bottom: 0.7rem;
        label {
          width: 5rem;
          flex-shrink: 0;
        }
        input {
          width: 100%;
        }
      }
    }
    .btn {
      margin-top: 1rem;
      text-align: right;
      button {
        width: 7rem;
        height: 2.8rem;
        color: white;
        text-transform: uppercase;
        background-color: #9575CD;
      }
    }
  }
`;

export default Profile;