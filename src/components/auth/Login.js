import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Login = ({ handleLogin, error }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>로그인</h1>
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder='이메일'
        />
        <input
          type="password"
          {...register("password", { required: true, minLength: 8 })}
          placeholder='비밀번호'
        />
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