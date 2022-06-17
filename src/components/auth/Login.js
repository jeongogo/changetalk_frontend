import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Login = ({ handleLogin, error }) => {
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    userid: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      handleLogin(values);
    }
  }

  const handleValidation = () => {
    const { password, userid } = values;
    if (userid.length === '') {
      setMessage('아이디를 입력해 주세요.');
      return false;
    } else if (password.length === '') {
      setMessage('비밀번호를 입력해 주세요.');
      return false;
    }
    return true;
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>로그인</h1>
        <input
          type="text"
          name='userid'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          placeholder='아이디'
        />
        <input
          type="password"
          name='password'
          onChange={(e) => handleChange(e)}
          placeholder='비밀번호'
        />
          {message && (
            <div>{message}</div>
          )}
          {error && (
            <div>{error}</div>
          )}
        <button type='submit'>로그인</button>
      </form>
      <div className="register">
        <Link to="/register">회원가입</Link>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: calc(100vh - 3rem);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 20rem;
    gap: 0.6rem;
    h1 {
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
    }
    input {
      width: 100%;
    }
    button {
      width: 100%;
      height: 2.8rem;
      color: white;
      text-transform: uppercase;
      background-color: #9575CD;
    }
  }
  .register {
    width: 100%;
    max-width: 20rem;
    margin-top: 0.7rem;
    text-align: right;
  }
`;

export default Login;