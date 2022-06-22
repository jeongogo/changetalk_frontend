import React from 'react';
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from 'styled-components';

const Register = ({ handleRegister, error }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    if (handleValidation()) {
      handleRegister(data);
    }
  }

  const handleValidation = () => {
    if (register.password !== register.confirmPassword) {
      errors.confirmPassword = true;
      return false;
    }
    return true;
  }

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <h1>회원가입</h1>
        <input
          type="email"
          placeholder='이메일'
          {...register("email", { required: true })}
          required
        />
        <input
          type="text"
          placeholder='이름'
          {...register("username", { required: true })}
        />
        <input
          type="password"
          placeholder='비밀번호'
          {...register("password", { required: true, minLength: 8 })}
          minLength='8'
        />
        <input
          type="password"
          placeholder='비밀번호 확인'
          {...register("confirmPassword", { required: true, minLength: 8 })}
        />
        {errors.confirmPassword && <div>비밀번호가 일치하지 않습니다.</div> }
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