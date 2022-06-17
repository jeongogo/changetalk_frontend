import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Register = ({ handleRegister, error }) => {
  const [message, setMessage] = useState('');
  const [values, setValues] = useState({
    userid: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      handleRegister(values);
    }
  }

  const handleValidation = () => {
    const { password, confirmPassword, username, userid } = values;
    if (password !== confirmPassword) {
      setMessage('비밀번호가 일치하지 않습니다.');
      return false;
    } else if (username === '') {
      setMessage('이름을 입력해 주세요.');
      return false;
    } else if (userid.length < 3) {
      setMessage('아이디는 4자 이상 입력해 주세요.');
      return false;
    } else if (password.length < 8) {
      setMessage('비밀번호는 8자 이상 입력해 주세요.');
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
        <h1>회원가입</h1>
        <input
          type="text"
          value={values.userid}
          name='userid'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          placeholder='아이디'
        />
        <input
          type="text"
          value={values.username}
          name='username'
          onChange={(e) => handleChange(e)}
          autoComplete='off'
          placeholder='이름'
        />
        <input
          type="password"
          value={values.password}
          name='password'
          onChange={(e) => handleChange(e)}
          placeholder='비밀번호'
        />
        <input
          type="password"
          value={values.confirmPassword}
          name='confirmPassword'
          onChange={(e) => handleChange(e)}
          placeholder='비밀번호 확인'
        />
        {message && (
          <div>{message}</div>
        )}
        {error && (
          <div>{error}</div>
        )}
        <button type='submit'>회원가입</button>
      </form>
      <div className="login">
        <Link to="/login">로그인</Link>
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
  .login {
    width: 100%;
    max-width: 20rem;
    margin-top: 0.7rem;
    text-align: right;
  }
`;

export default Register;